package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.EstMast;
import com.affinity.consent.repository.EstMastRepository;
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
 * Integration tests for the {@link EstMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class EstMastResourceIT {

    private static final Integer DEFAULT_EST_CODE = 1;
    private static final Integer UPDATED_EST_CODE = 2;

    private static final String DEFAULT_EST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EST_NAME = "BBBBBBBBBB";

    @Autowired
    private EstMastRepository estMastRepository;

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

    private MockMvc restEstMastMockMvc;

    private EstMast estMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstMastResource estMastResource = new EstMastResource(estMastRepository);
        this.restEstMastMockMvc = MockMvcBuilders.standaloneSetup(estMastResource)
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
    public static EstMast createEntity(EntityManager em) {
        EstMast estMast = new EstMast()
            .estCode(DEFAULT_EST_CODE)
            .estName(DEFAULT_EST_NAME);
        return estMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstMast createUpdatedEntity(EntityManager em) {
        EstMast estMast = new EstMast()
            .estCode(UPDATED_EST_CODE)
            .estName(UPDATED_EST_NAME);
        return estMast;
    }

    @BeforeEach
    public void initTest() {
        estMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstMast() throws Exception {
        int databaseSizeBeforeCreate = estMastRepository.findAll().size();

        // Create the EstMast
        restEstMastMockMvc.perform(post("/api/est-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estMast)))
            .andExpect(status().isCreated());

        // Validate the EstMast in the database
        List<EstMast> estMastList = estMastRepository.findAll();
        assertThat(estMastList).hasSize(databaseSizeBeforeCreate + 1);
        EstMast testEstMast = estMastList.get(estMastList.size() - 1);
        assertThat(testEstMast.getEstCode()).isEqualTo(DEFAULT_EST_CODE);
        assertThat(testEstMast.getEstName()).isEqualTo(DEFAULT_EST_NAME);
    }

    @Test
    @Transactional
    public void createEstMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estMastRepository.findAll().size();

        // Create the EstMast with an existing ID
        estMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstMastMockMvc.perform(post("/api/est-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estMast)))
            .andExpect(status().isBadRequest());

        // Validate the EstMast in the database
        List<EstMast> estMastList = estMastRepository.findAll();
        assertThat(estMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstMasts() throws Exception {
        // Initialize the database
        estMastRepository.saveAndFlush(estMast);

        // Get all the estMastList
        restEstMastMockMvc.perform(get("/api/est-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].estCode").value(hasItem(DEFAULT_EST_CODE)))
            .andExpect(jsonPath("$.[*].estName").value(hasItem(DEFAULT_EST_NAME)));
    }
    
    @Test
    @Transactional
    public void getEstMast() throws Exception {
        // Initialize the database
        estMastRepository.saveAndFlush(estMast);

        // Get the estMast
        restEstMastMockMvc.perform(get("/api/est-masts/{id}", estMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estMast.getId().intValue()))
            .andExpect(jsonPath("$.estCode").value(DEFAULT_EST_CODE))
            .andExpect(jsonPath("$.estName").value(DEFAULT_EST_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingEstMast() throws Exception {
        // Get the estMast
        restEstMastMockMvc.perform(get("/api/est-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstMast() throws Exception {
        // Initialize the database
        estMastRepository.saveAndFlush(estMast);

        int databaseSizeBeforeUpdate = estMastRepository.findAll().size();

        // Update the estMast
        EstMast updatedEstMast = estMastRepository.findById(estMast.getId()).get();
        // Disconnect from session so that the updates on updatedEstMast are not directly saved in db
        em.detach(updatedEstMast);
        updatedEstMast
            .estCode(UPDATED_EST_CODE)
            .estName(UPDATED_EST_NAME);

        restEstMastMockMvc.perform(put("/api/est-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstMast)))
            .andExpect(status().isOk());

        // Validate the EstMast in the database
        List<EstMast> estMastList = estMastRepository.findAll();
        assertThat(estMastList).hasSize(databaseSizeBeforeUpdate);
        EstMast testEstMast = estMastList.get(estMastList.size() - 1);
        assertThat(testEstMast.getEstCode()).isEqualTo(UPDATED_EST_CODE);
        assertThat(testEstMast.getEstName()).isEqualTo(UPDATED_EST_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEstMast() throws Exception {
        int databaseSizeBeforeUpdate = estMastRepository.findAll().size();

        // Create the EstMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstMastMockMvc.perform(put("/api/est-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estMast)))
            .andExpect(status().isBadRequest());

        // Validate the EstMast in the database
        List<EstMast> estMastList = estMastRepository.findAll();
        assertThat(estMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstMast() throws Exception {
        // Initialize the database
        estMastRepository.saveAndFlush(estMast);

        int databaseSizeBeforeDelete = estMastRepository.findAll().size();

        // Delete the estMast
        restEstMastMockMvc.perform(delete("/api/est-masts/{id}", estMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstMast> estMastList = estMastRepository.findAll();
        assertThat(estMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
