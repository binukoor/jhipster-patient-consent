package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.VisitBar;
import com.affinity.consent.repository.VisitBarRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.affinity.consent.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VisitBarResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class VisitBarResourceIT {

    private static final Long DEFAULT_VISIT_ID = 1L;
    private static final Long UPDATED_VISIT_ID = 2L;

    private static final String DEFAULT_VISIT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_VISIT_TYPE = "BBBBBBBBBB";

    private static final Instant DEFAULT_VISIT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VISIT_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_SEEN_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SEEN_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DEPT_CODE = 1;
    private static final Integer UPDATED_DEPT_CODE = 2;

    private static final String DEFAULT_DEPT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEPT_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLINIC_CODE = 1;
    private static final Integer UPDATED_CLINIC_CODE = 2;

    private static final String DEFAULT_CLINIC_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLINIC_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CONSULTANT_CODE = 1;
    private static final Integer UPDATED_CONSULTANT_CODE = 2;

    private static final String DEFAULT_CONSULTANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONSULTANT_NAME = "BBBBBBBBBB";

    @Autowired
    private VisitBarRepository visitBarRepository;

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

    private MockMvc restVisitBarMockMvc;

    private VisitBar visitBar;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VisitBarResource visitBarResource = new VisitBarResource(visitBarRepository);
        this.restVisitBarMockMvc = MockMvcBuilders.standaloneSetup(visitBarResource)
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
    public static VisitBar createEntity(EntityManager em) {
        VisitBar visitBar = new VisitBar()
            .visitId(DEFAULT_VISIT_ID)
            .visitType(DEFAULT_VISIT_TYPE)
            .visitTime(DEFAULT_VISIT_TIME)
            .seenTime(DEFAULT_SEEN_TIME)
            .deptCode(DEFAULT_DEPT_CODE)
            .deptName(DEFAULT_DEPT_NAME)
            .clinicCode(DEFAULT_CLINIC_CODE)
            .clinicName(DEFAULT_CLINIC_NAME)
            .consultantCode(DEFAULT_CONSULTANT_CODE)
            .consultantName(DEFAULT_CONSULTANT_NAME);
        return visitBar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitBar createUpdatedEntity(EntityManager em) {
        VisitBar visitBar = new VisitBar()
            .visitId(UPDATED_VISIT_ID)
            .visitType(UPDATED_VISIT_TYPE)
            .visitTime(UPDATED_VISIT_TIME)
            .seenTime(UPDATED_SEEN_TIME)
            .deptCode(UPDATED_DEPT_CODE)
            .deptName(UPDATED_DEPT_NAME)
            .clinicCode(UPDATED_CLINIC_CODE)
            .clinicName(UPDATED_CLINIC_NAME)
            .consultantCode(UPDATED_CONSULTANT_CODE)
            .consultantName(UPDATED_CONSULTANT_NAME);
        return visitBar;
    }

    @BeforeEach
    public void initTest() {
        visitBar = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisitBar() throws Exception {
        int databaseSizeBeforeCreate = visitBarRepository.findAll().size();

        // Create the VisitBar
        restVisitBarMockMvc.perform(post("/api/visit-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitBar)))
            .andExpect(status().isCreated());

        // Validate the VisitBar in the database
        List<VisitBar> visitBarList = visitBarRepository.findAll();
        assertThat(visitBarList).hasSize(databaseSizeBeforeCreate + 1);
        VisitBar testVisitBar = visitBarList.get(visitBarList.size() - 1);
        assertThat(testVisitBar.getVisitId()).isEqualTo(DEFAULT_VISIT_ID);
        assertThat(testVisitBar.getVisitType()).isEqualTo(DEFAULT_VISIT_TYPE);
        assertThat(testVisitBar.getVisitTime()).isEqualTo(DEFAULT_VISIT_TIME);
        assertThat(testVisitBar.getSeenTime()).isEqualTo(DEFAULT_SEEN_TIME);
        assertThat(testVisitBar.getDeptCode()).isEqualTo(DEFAULT_DEPT_CODE);
        assertThat(testVisitBar.getDeptName()).isEqualTo(DEFAULT_DEPT_NAME);
        assertThat(testVisitBar.getClinicCode()).isEqualTo(DEFAULT_CLINIC_CODE);
        assertThat(testVisitBar.getClinicName()).isEqualTo(DEFAULT_CLINIC_NAME);
        assertThat(testVisitBar.getConsultantCode()).isEqualTo(DEFAULT_CONSULTANT_CODE);
        assertThat(testVisitBar.getConsultantName()).isEqualTo(DEFAULT_CONSULTANT_NAME);
    }

    @Test
    @Transactional
    public void createVisitBarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitBarRepository.findAll().size();

        // Create the VisitBar with an existing ID
        visitBar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitBarMockMvc.perform(post("/api/visit-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitBar)))
            .andExpect(status().isBadRequest());

        // Validate the VisitBar in the database
        List<VisitBar> visitBarList = visitBarRepository.findAll();
        assertThat(visitBarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVisitBars() throws Exception {
        // Initialize the database
        visitBarRepository.saveAndFlush(visitBar);

        // Get all the visitBarList
        restVisitBarMockMvc.perform(get("/api/visit-bars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitBar.getId().intValue())))
            .andExpect(jsonPath("$.[*].visitId").value(hasItem(DEFAULT_VISIT_ID.intValue())))
            .andExpect(jsonPath("$.[*].visitType").value(hasItem(DEFAULT_VISIT_TYPE)))
            .andExpect(jsonPath("$.[*].visitTime").value(hasItem(DEFAULT_VISIT_TIME.toString())))
            .andExpect(jsonPath("$.[*].seenTime").value(hasItem(DEFAULT_SEEN_TIME.toString())))
            .andExpect(jsonPath("$.[*].deptCode").value(hasItem(DEFAULT_DEPT_CODE)))
            .andExpect(jsonPath("$.[*].deptName").value(hasItem(DEFAULT_DEPT_NAME)))
            .andExpect(jsonPath("$.[*].clinicCode").value(hasItem(DEFAULT_CLINIC_CODE)))
            .andExpect(jsonPath("$.[*].clinicName").value(hasItem(DEFAULT_CLINIC_NAME)))
            .andExpect(jsonPath("$.[*].consultantCode").value(hasItem(DEFAULT_CONSULTANT_CODE)))
            .andExpect(jsonPath("$.[*].consultantName").value(hasItem(DEFAULT_CONSULTANT_NAME)));
    }
    
    @Test
    @Transactional
    public void getVisitBar() throws Exception {
        // Initialize the database
        visitBarRepository.saveAndFlush(visitBar);

        // Get the visitBar
        restVisitBarMockMvc.perform(get("/api/visit-bars/{id}", visitBar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(visitBar.getId().intValue()))
            .andExpect(jsonPath("$.visitId").value(DEFAULT_VISIT_ID.intValue()))
            .andExpect(jsonPath("$.visitType").value(DEFAULT_VISIT_TYPE))
            .andExpect(jsonPath("$.visitTime").value(DEFAULT_VISIT_TIME.toString()))
            .andExpect(jsonPath("$.seenTime").value(DEFAULT_SEEN_TIME.toString()))
            .andExpect(jsonPath("$.deptCode").value(DEFAULT_DEPT_CODE))
            .andExpect(jsonPath("$.deptName").value(DEFAULT_DEPT_NAME))
            .andExpect(jsonPath("$.clinicCode").value(DEFAULT_CLINIC_CODE))
            .andExpect(jsonPath("$.clinicName").value(DEFAULT_CLINIC_NAME))
            .andExpect(jsonPath("$.consultantCode").value(DEFAULT_CONSULTANT_CODE))
            .andExpect(jsonPath("$.consultantName").value(DEFAULT_CONSULTANT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingVisitBar() throws Exception {
        // Get the visitBar
        restVisitBarMockMvc.perform(get("/api/visit-bars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisitBar() throws Exception {
        // Initialize the database
        visitBarRepository.saveAndFlush(visitBar);

        int databaseSizeBeforeUpdate = visitBarRepository.findAll().size();

        // Update the visitBar
        VisitBar updatedVisitBar = visitBarRepository.findById(visitBar.getId()).get();
        // Disconnect from session so that the updates on updatedVisitBar are not directly saved in db
        em.detach(updatedVisitBar);
        updatedVisitBar
            .visitId(UPDATED_VISIT_ID)
            .visitType(UPDATED_VISIT_TYPE)
            .visitTime(UPDATED_VISIT_TIME)
            .seenTime(UPDATED_SEEN_TIME)
            .deptCode(UPDATED_DEPT_CODE)
            .deptName(UPDATED_DEPT_NAME)
            .clinicCode(UPDATED_CLINIC_CODE)
            .clinicName(UPDATED_CLINIC_NAME)
            .consultantCode(UPDATED_CONSULTANT_CODE)
            .consultantName(UPDATED_CONSULTANT_NAME);

        restVisitBarMockMvc.perform(put("/api/visit-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVisitBar)))
            .andExpect(status().isOk());

        // Validate the VisitBar in the database
        List<VisitBar> visitBarList = visitBarRepository.findAll();
        assertThat(visitBarList).hasSize(databaseSizeBeforeUpdate);
        VisitBar testVisitBar = visitBarList.get(visitBarList.size() - 1);
        assertThat(testVisitBar.getVisitId()).isEqualTo(UPDATED_VISIT_ID);
        assertThat(testVisitBar.getVisitType()).isEqualTo(UPDATED_VISIT_TYPE);
        assertThat(testVisitBar.getVisitTime()).isEqualTo(UPDATED_VISIT_TIME);
        assertThat(testVisitBar.getSeenTime()).isEqualTo(UPDATED_SEEN_TIME);
        assertThat(testVisitBar.getDeptCode()).isEqualTo(UPDATED_DEPT_CODE);
        assertThat(testVisitBar.getDeptName()).isEqualTo(UPDATED_DEPT_NAME);
        assertThat(testVisitBar.getClinicCode()).isEqualTo(UPDATED_CLINIC_CODE);
        assertThat(testVisitBar.getClinicName()).isEqualTo(UPDATED_CLINIC_NAME);
        assertThat(testVisitBar.getConsultantCode()).isEqualTo(UPDATED_CONSULTANT_CODE);
        assertThat(testVisitBar.getConsultantName()).isEqualTo(UPDATED_CONSULTANT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingVisitBar() throws Exception {
        int databaseSizeBeforeUpdate = visitBarRepository.findAll().size();

        // Create the VisitBar

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitBarMockMvc.perform(put("/api/visit-bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitBar)))
            .andExpect(status().isBadRequest());

        // Validate the VisitBar in the database
        List<VisitBar> visitBarList = visitBarRepository.findAll();
        assertThat(visitBarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisitBar() throws Exception {
        // Initialize the database
        visitBarRepository.saveAndFlush(visitBar);

        int databaseSizeBeforeDelete = visitBarRepository.findAll().size();

        // Delete the visitBar
        restVisitBarMockMvc.perform(delete("/api/visit-bars/{id}", visitBar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VisitBar> visitBarList = visitBarRepository.findAll();
        assertThat(visitBarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
