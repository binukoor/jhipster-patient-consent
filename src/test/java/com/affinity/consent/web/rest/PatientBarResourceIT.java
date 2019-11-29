package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.PatientBar;
import com.affinity.consent.repository.PatientBarRepository;
import com.affinity.consent.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.affinity.consent.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PatientBarResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class PatientBarResourceIT {

    private static final Long DEFAULT_PATIENT_ID = 1L;
    private static final Long UPDATED_PATIENT_ID = 2L;

    private static final String DEFAULT_PATIENT_NO = "AAAAAAAAAA";
    private static final String UPDATED_PATIENT_NO = "BBBBBBBBBB";

    private static final String DEFAULT_PATIENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PATIENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_AGE = "AAAAAAAAAA";
    private static final String UPDATED_AGE = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    @Autowired
    private PatientBarRepository patientBarRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPatientBarMockMvc;

    private PatientBar patientBar;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PatientBarResource patientBarResource = new PatientBarResource(patientBarRepository);
        this.restPatientBarMockMvc = MockMvcBuilders.standaloneSetup(patientBarResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PatientBar createEntity(EntityManager em) {
        PatientBar patientBar = new PatientBar()
            .patientId(DEFAULT_PATIENT_ID)
            .patientNo(DEFAULT_PATIENT_NO)
            .patientName(DEFAULT_PATIENT_NAME)
            .age(DEFAULT_AGE)
            .gender(DEFAULT_GENDER);
        return patientBar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PatientBar createUpdatedEntity(EntityManager em) {
        PatientBar patientBar = new PatientBar()
            .patientId(UPDATED_PATIENT_ID)
            .patientNo(UPDATED_PATIENT_NO)
            .patientName(UPDATED_PATIENT_NAME)
            .age(UPDATED_AGE)
            .gender(UPDATED_GENDER);
        return patientBar;
    }

    @BeforeEach
    public void initTest() {
        patientBar = createEntity(em);
    }

    @Test
    @Transactional
    public void createPatientBar() throws Exception {
        int databaseSizeBeforeCreate = patientBarRepository.findAll().size();

        // Create the PatientBar
        restPatientBarMockMvc.perform(post("/api/patient-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientBar)))
            .andExpect(status().isCreated());

        // Validate the PatientBar in the database
        List<PatientBar> patientBarList = patientBarRepository.findAll();
        assertThat(patientBarList).hasSize(databaseSizeBeforeCreate + 1);
        PatientBar testPatientBar = patientBarList.get(patientBarList.size() - 1);
        assertThat(testPatientBar.getPatientId()).isEqualTo(DEFAULT_PATIENT_ID);
        assertThat(testPatientBar.getPatientNo()).isEqualTo(DEFAULT_PATIENT_NO);
        assertThat(testPatientBar.getPatientName()).isEqualTo(DEFAULT_PATIENT_NAME);
        assertThat(testPatientBar.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testPatientBar.getGender()).isEqualTo(DEFAULT_GENDER);
    }

    @Test
    @Transactional
    public void createPatientBarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = patientBarRepository.findAll().size();

        // Create the PatientBar with an existing ID
        patientBar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatientBarMockMvc.perform(post("/api/patient-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientBar)))
            .andExpect(status().isBadRequest());

        // Validate the PatientBar in the database
        List<PatientBar> patientBarList = patientBarRepository.findAll();
        assertThat(patientBarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPatientBars() throws Exception {
        // Initialize the database
        patientBarRepository.saveAndFlush(patientBar);

        // Get all the patientBarList
        restPatientBarMockMvc.perform(get("/api/patient-bars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patientBar.getId().intValue())))
            .andExpect(jsonPath("$.[*].patientId").value(hasItem(DEFAULT_PATIENT_ID.intValue())))
            .andExpect(jsonPath("$.[*].patientNo").value(hasItem(DEFAULT_PATIENT_NO)))
            .andExpect(jsonPath("$.[*].patientName").value(hasItem(DEFAULT_PATIENT_NAME)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)));
    }
    
    @Test
    @Transactional
    public void getPatientBar() throws Exception {
        // Initialize the database
        patientBarRepository.saveAndFlush(patientBar);

        // Get the patientBar
        restPatientBarMockMvc.perform(get("/api/patient-bars/{id}", patientBar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(patientBar.getId().intValue()))
            .andExpect(jsonPath("$.patientId").value(DEFAULT_PATIENT_ID.intValue()))
            .andExpect(jsonPath("$.patientNo").value(DEFAULT_PATIENT_NO))
            .andExpect(jsonPath("$.patientName").value(DEFAULT_PATIENT_NAME))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER));
    }

    @Test
    @Transactional
    public void getNonExistingPatientBar() throws Exception {
        // Get the patientBar
        restPatientBarMockMvc.perform(get("/api/patient-bars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePatientBar() throws Exception {
        // Initialize the database
        patientBarRepository.saveAndFlush(patientBar);

        int databaseSizeBeforeUpdate = patientBarRepository.findAll().size();

        // Update the patientBar
        PatientBar updatedPatientBar = patientBarRepository.findById(patientBar.getId()).get();
        // Disconnect from session so that the updates on updatedPatientBar are not directly saved in db
        em.detach(updatedPatientBar);
        updatedPatientBar
            .patientId(UPDATED_PATIENT_ID)
            .patientNo(UPDATED_PATIENT_NO)
            .patientName(UPDATED_PATIENT_NAME)
            .age(UPDATED_AGE)
            .gender(UPDATED_GENDER);

        restPatientBarMockMvc.perform(put("/api/patient-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPatientBar)))
            .andExpect(status().isOk());

        // Validate the PatientBar in the database
        List<PatientBar> patientBarList = patientBarRepository.findAll();
        assertThat(patientBarList).hasSize(databaseSizeBeforeUpdate);
        PatientBar testPatientBar = patientBarList.get(patientBarList.size() - 1);
        assertThat(testPatientBar.getPatientId()).isEqualTo(UPDATED_PATIENT_ID);
        assertThat(testPatientBar.getPatientNo()).isEqualTo(UPDATED_PATIENT_NO);
        assertThat(testPatientBar.getPatientName()).isEqualTo(UPDATED_PATIENT_NAME);
        assertThat(testPatientBar.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testPatientBar.getGender()).isEqualTo(UPDATED_GENDER);
    }

    @Test
    @Transactional
    public void updateNonExistingPatientBar() throws Exception {
        int databaseSizeBeforeUpdate = patientBarRepository.findAll().size();

        // Create the PatientBar

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPatientBarMockMvc.perform(put("/api/patient-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientBar)))
            .andExpect(status().isBadRequest());

        // Validate the PatientBar in the database
        List<PatientBar> patientBarList = patientBarRepository.findAll();
        assertThat(patientBarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePatientBar() throws Exception {
        // Initialize the database
        patientBarRepository.saveAndFlush(patientBar);

        int databaseSizeBeforeDelete = patientBarRepository.findAll().size();

        // Delete the patientBar
        restPatientBarMockMvc.perform(delete("/api/patient-bars/{id}", patientBar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PatientBar> patientBarList = patientBarRepository.findAll();
        assertThat(patientBarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
