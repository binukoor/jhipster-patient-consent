package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.ProcMast;
import com.affinity.consent.repository.ProcMastRepository;
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
 * Integration tests for the {@link ProcMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class ProcMastResourceIT {

    private static final Integer DEFAULT_PROC_CODE = 1;
    private static final Integer UPDATED_PROC_CODE = 2;

    private static final String DEFAULT_PROC_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROC_NAME = "BBBBBBBBBB";

    @Autowired
    private ProcMastRepository procMastRepository;

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

    private MockMvc restProcMastMockMvc;

    private ProcMast procMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcMastResource procMastResource = new ProcMastResource(procMastRepository);
        this.restProcMastMockMvc = MockMvcBuilders.standaloneSetup(procMastResource)
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
    public static ProcMast createEntity(EntityManager em) {
        ProcMast procMast = new ProcMast()
            .procCode(DEFAULT_PROC_CODE)
            .procName(DEFAULT_PROC_NAME);
        return procMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcMast createUpdatedEntity(EntityManager em) {
        ProcMast procMast = new ProcMast()
            .procCode(UPDATED_PROC_CODE)
            .procName(UPDATED_PROC_NAME);
        return procMast;
    }

    @BeforeEach
    public void initTest() {
        procMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcMast() throws Exception {
        int databaseSizeBeforeCreate = procMastRepository.findAll().size();

        // Create the ProcMast
        restProcMastMockMvc.perform(post("/api/proc-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procMast)))
            .andExpect(status().isCreated());

        // Validate the ProcMast in the database
        List<ProcMast> procMastList = procMastRepository.findAll();
        assertThat(procMastList).hasSize(databaseSizeBeforeCreate + 1);
        ProcMast testProcMast = procMastList.get(procMastList.size() - 1);
        assertThat(testProcMast.getProcCode()).isEqualTo(DEFAULT_PROC_CODE);
        assertThat(testProcMast.getProcName()).isEqualTo(DEFAULT_PROC_NAME);
    }

    @Test
    @Transactional
    public void createProcMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = procMastRepository.findAll().size();

        // Create the ProcMast with an existing ID
        procMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcMastMockMvc.perform(post("/api/proc-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procMast)))
            .andExpect(status().isBadRequest());

        // Validate the ProcMast in the database
        List<ProcMast> procMastList = procMastRepository.findAll();
        assertThat(procMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProcMasts() throws Exception {
        // Initialize the database
        procMastRepository.saveAndFlush(procMast);

        // Get all the procMastList
        restProcMastMockMvc.perform(get("/api/proc-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(procMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].procCode").value(hasItem(DEFAULT_PROC_CODE)))
            .andExpect(jsonPath("$.[*].procName").value(hasItem(DEFAULT_PROC_NAME)));
    }
    
    @Test
    @Transactional
    public void getProcMast() throws Exception {
        // Initialize the database
        procMastRepository.saveAndFlush(procMast);

        // Get the procMast
        restProcMastMockMvc.perform(get("/api/proc-masts/{id}", procMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(procMast.getId().intValue()))
            .andExpect(jsonPath("$.procCode").value(DEFAULT_PROC_CODE))
            .andExpect(jsonPath("$.procName").value(DEFAULT_PROC_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingProcMast() throws Exception {
        // Get the procMast
        restProcMastMockMvc.perform(get("/api/proc-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcMast() throws Exception {
        // Initialize the database
        procMastRepository.saveAndFlush(procMast);

        int databaseSizeBeforeUpdate = procMastRepository.findAll().size();

        // Update the procMast
        ProcMast updatedProcMast = procMastRepository.findById(procMast.getId()).get();
        // Disconnect from session so that the updates on updatedProcMast are not directly saved in db
        em.detach(updatedProcMast);
        updatedProcMast
            .procCode(UPDATED_PROC_CODE)
            .procName(UPDATED_PROC_NAME);

        restProcMastMockMvc.perform(put("/api/proc-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcMast)))
            .andExpect(status().isOk());

        // Validate the ProcMast in the database
        List<ProcMast> procMastList = procMastRepository.findAll();
        assertThat(procMastList).hasSize(databaseSizeBeforeUpdate);
        ProcMast testProcMast = procMastList.get(procMastList.size() - 1);
        assertThat(testProcMast.getProcCode()).isEqualTo(UPDATED_PROC_CODE);
        assertThat(testProcMast.getProcName()).isEqualTo(UPDATED_PROC_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProcMast() throws Exception {
        int databaseSizeBeforeUpdate = procMastRepository.findAll().size();

        // Create the ProcMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcMastMockMvc.perform(put("/api/proc-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procMast)))
            .andExpect(status().isBadRequest());

        // Validate the ProcMast in the database
        List<ProcMast> procMastList = procMastRepository.findAll();
        assertThat(procMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcMast() throws Exception {
        // Initialize the database
        procMastRepository.saveAndFlush(procMast);

        int databaseSizeBeforeDelete = procMastRepository.findAll().size();

        // Delete the procMast
        restProcMastMockMvc.perform(delete("/api/proc-masts/{id}", procMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProcMast> procMastList = procMastRepository.findAll();
        assertThat(procMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
