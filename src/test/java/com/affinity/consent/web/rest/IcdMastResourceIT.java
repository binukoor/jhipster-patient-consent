package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.IcdMast;
import com.affinity.consent.repository.IcdMastRepository;
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
 * Integration tests for the {@link IcdMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class IcdMastResourceIT {

    private static final String DEFAULT_ICD = "AAAAAAAAAA";
    private static final String UPDATED_ICD = "BBBBBBBBBB";

    private static final String DEFAULT_DISEASE = "AAAAAAAAAA";
    private static final String UPDATED_DISEASE = "BBBBBBBBBB";

    @Autowired
    private IcdMastRepository icdMastRepository;

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

    private MockMvc restIcdMastMockMvc;

    private IcdMast icdMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IcdMastResource icdMastResource = new IcdMastResource(icdMastRepository);
        this.restIcdMastMockMvc = MockMvcBuilders.standaloneSetup(icdMastResource)
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
    public static IcdMast createEntity(EntityManager em) {
        IcdMast icdMast = new IcdMast()
            .icd(DEFAULT_ICD)
            .disease(DEFAULT_DISEASE);
        return icdMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IcdMast createUpdatedEntity(EntityManager em) {
        IcdMast icdMast = new IcdMast()
            .icd(UPDATED_ICD)
            .disease(UPDATED_DISEASE);
        return icdMast;
    }

    @BeforeEach
    public void initTest() {
        icdMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createIcdMast() throws Exception {
        int databaseSizeBeforeCreate = icdMastRepository.findAll().size();

        // Create the IcdMast
        restIcdMastMockMvc.perform(post("/api/icd-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(icdMast)))
            .andExpect(status().isCreated());

        // Validate the IcdMast in the database
        List<IcdMast> icdMastList = icdMastRepository.findAll();
        assertThat(icdMastList).hasSize(databaseSizeBeforeCreate + 1);
        IcdMast testIcdMast = icdMastList.get(icdMastList.size() - 1);
        assertThat(testIcdMast.getIcd()).isEqualTo(DEFAULT_ICD);
        assertThat(testIcdMast.getDisease()).isEqualTo(DEFAULT_DISEASE);
    }

    @Test
    @Transactional
    public void createIcdMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = icdMastRepository.findAll().size();

        // Create the IcdMast with an existing ID
        icdMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIcdMastMockMvc.perform(post("/api/icd-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(icdMast)))
            .andExpect(status().isBadRequest());

        // Validate the IcdMast in the database
        List<IcdMast> icdMastList = icdMastRepository.findAll();
        assertThat(icdMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIcdMasts() throws Exception {
        // Initialize the database
        icdMastRepository.saveAndFlush(icdMast);

        // Get all the icdMastList
        restIcdMastMockMvc.perform(get("/api/icd-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(icdMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].icd").value(hasItem(DEFAULT_ICD)))
            .andExpect(jsonPath("$.[*].disease").value(hasItem(DEFAULT_DISEASE)));
    }
    
    @Test
    @Transactional
    public void getIcdMast() throws Exception {
        // Initialize the database
        icdMastRepository.saveAndFlush(icdMast);

        // Get the icdMast
        restIcdMastMockMvc.perform(get("/api/icd-masts/{id}", icdMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(icdMast.getId().intValue()))
            .andExpect(jsonPath("$.icd").value(DEFAULT_ICD))
            .andExpect(jsonPath("$.disease").value(DEFAULT_DISEASE));
    }

    @Test
    @Transactional
    public void getNonExistingIcdMast() throws Exception {
        // Get the icdMast
        restIcdMastMockMvc.perform(get("/api/icd-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIcdMast() throws Exception {
        // Initialize the database
        icdMastRepository.saveAndFlush(icdMast);

        int databaseSizeBeforeUpdate = icdMastRepository.findAll().size();

        // Update the icdMast
        IcdMast updatedIcdMast = icdMastRepository.findById(icdMast.getId()).get();
        // Disconnect from session so that the updates on updatedIcdMast are not directly saved in db
        em.detach(updatedIcdMast);
        updatedIcdMast
            .icd(UPDATED_ICD)
            .disease(UPDATED_DISEASE);

        restIcdMastMockMvc.perform(put("/api/icd-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIcdMast)))
            .andExpect(status().isOk());

        // Validate the IcdMast in the database
        List<IcdMast> icdMastList = icdMastRepository.findAll();
        assertThat(icdMastList).hasSize(databaseSizeBeforeUpdate);
        IcdMast testIcdMast = icdMastList.get(icdMastList.size() - 1);
        assertThat(testIcdMast.getIcd()).isEqualTo(UPDATED_ICD);
        assertThat(testIcdMast.getDisease()).isEqualTo(UPDATED_DISEASE);
    }

    @Test
    @Transactional
    public void updateNonExistingIcdMast() throws Exception {
        int databaseSizeBeforeUpdate = icdMastRepository.findAll().size();

        // Create the IcdMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIcdMastMockMvc.perform(put("/api/icd-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(icdMast)))
            .andExpect(status().isBadRequest());

        // Validate the IcdMast in the database
        List<IcdMast> icdMastList = icdMastRepository.findAll();
        assertThat(icdMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIcdMast() throws Exception {
        // Initialize the database
        icdMastRepository.saveAndFlush(icdMast);

        int databaseSizeBeforeDelete = icdMastRepository.findAll().size();

        // Delete the icdMast
        restIcdMastMockMvc.perform(delete("/api/icd-masts/{id}", icdMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IcdMast> icdMastList = icdMastRepository.findAll();
        assertThat(icdMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
