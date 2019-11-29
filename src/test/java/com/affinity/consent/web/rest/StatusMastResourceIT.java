package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.StatusMast;
import com.affinity.consent.repository.StatusMastRepository;
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
 * Integration tests for the {@link StatusMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class StatusMastResourceIT {

    private static final Integer DEFAULT_STATUS_CODE = 1;
    private static final Integer UPDATED_STATUS_CODE = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private StatusMastRepository statusMastRepository;

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

    private MockMvc restStatusMastMockMvc;

    private StatusMast statusMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatusMastResource statusMastResource = new StatusMastResource(statusMastRepository);
        this.restStatusMastMockMvc = MockMvcBuilders.standaloneSetup(statusMastResource)
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
    public static StatusMast createEntity(EntityManager em) {
        StatusMast statusMast = new StatusMast()
            .statusCode(DEFAULT_STATUS_CODE)
            .status(DEFAULT_STATUS);
        return statusMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatusMast createUpdatedEntity(EntityManager em) {
        StatusMast statusMast = new StatusMast()
            .statusCode(UPDATED_STATUS_CODE)
            .status(UPDATED_STATUS);
        return statusMast;
    }

    @BeforeEach
    public void initTest() {
        statusMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatusMast() throws Exception {
        int databaseSizeBeforeCreate = statusMastRepository.findAll().size();

        // Create the StatusMast
        restStatusMastMockMvc.perform(post("/api/status-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusMast)))
            .andExpect(status().isCreated());

        // Validate the StatusMast in the database
        List<StatusMast> statusMastList = statusMastRepository.findAll();
        assertThat(statusMastList).hasSize(databaseSizeBeforeCreate + 1);
        StatusMast testStatusMast = statusMastList.get(statusMastList.size() - 1);
        assertThat(testStatusMast.getStatusCode()).isEqualTo(DEFAULT_STATUS_CODE);
        assertThat(testStatusMast.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createStatusMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statusMastRepository.findAll().size();

        // Create the StatusMast with an existing ID
        statusMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatusMastMockMvc.perform(post("/api/status-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusMast)))
            .andExpect(status().isBadRequest());

        // Validate the StatusMast in the database
        List<StatusMast> statusMastList = statusMastRepository.findAll();
        assertThat(statusMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStatusMasts() throws Exception {
        // Initialize the database
        statusMastRepository.saveAndFlush(statusMast);

        // Get all the statusMastList
        restStatusMastMockMvc.perform(get("/api/status-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statusMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].statusCode").value(hasItem(DEFAULT_STATUS_CODE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getStatusMast() throws Exception {
        // Initialize the database
        statusMastRepository.saveAndFlush(statusMast);

        // Get the statusMast
        restStatusMastMockMvc.perform(get("/api/status-masts/{id}", statusMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(statusMast.getId().intValue()))
            .andExpect(jsonPath("$.statusCode").value(DEFAULT_STATUS_CODE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingStatusMast() throws Exception {
        // Get the statusMast
        restStatusMastMockMvc.perform(get("/api/status-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatusMast() throws Exception {
        // Initialize the database
        statusMastRepository.saveAndFlush(statusMast);

        int databaseSizeBeforeUpdate = statusMastRepository.findAll().size();

        // Update the statusMast
        StatusMast updatedStatusMast = statusMastRepository.findById(statusMast.getId()).get();
        // Disconnect from session so that the updates on updatedStatusMast are not directly saved in db
        em.detach(updatedStatusMast);
        updatedStatusMast
            .statusCode(UPDATED_STATUS_CODE)
            .status(UPDATED_STATUS);

        restStatusMastMockMvc.perform(put("/api/status-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatusMast)))
            .andExpect(status().isOk());

        // Validate the StatusMast in the database
        List<StatusMast> statusMastList = statusMastRepository.findAll();
        assertThat(statusMastList).hasSize(databaseSizeBeforeUpdate);
        StatusMast testStatusMast = statusMastList.get(statusMastList.size() - 1);
        assertThat(testStatusMast.getStatusCode()).isEqualTo(UPDATED_STATUS_CODE);
        assertThat(testStatusMast.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingStatusMast() throws Exception {
        int databaseSizeBeforeUpdate = statusMastRepository.findAll().size();

        // Create the StatusMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatusMastMockMvc.perform(put("/api/status-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusMast)))
            .andExpect(status().isBadRequest());

        // Validate the StatusMast in the database
        List<StatusMast> statusMastList = statusMastRepository.findAll();
        assertThat(statusMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStatusMast() throws Exception {
        // Initialize the database
        statusMastRepository.saveAndFlush(statusMast);

        int databaseSizeBeforeDelete = statusMastRepository.findAll().size();

        // Delete the statusMast
        restStatusMastMockMvc.perform(delete("/api/status-masts/{id}", statusMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatusMast> statusMastList = statusMastRepository.findAll();
        assertThat(statusMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
