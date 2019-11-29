package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.ScopeMast;
import com.affinity.consent.repository.ScopeMastRepository;
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
 * Integration tests for the {@link ScopeMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class ScopeMastResourceIT {

    private static final Integer DEFAULT_SCOPE_CODE = 1;
    private static final Integer UPDATED_SCOPE_CODE = 2;

    private static final String DEFAULT_SCOPE = "AAAAAAAAAA";
    private static final String UPDATED_SCOPE = "BBBBBBBBBB";

    @Autowired
    private ScopeMastRepository scopeMastRepository;

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

    private MockMvc restScopeMastMockMvc;

    private ScopeMast scopeMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScopeMastResource scopeMastResource = new ScopeMastResource(scopeMastRepository);
        this.restScopeMastMockMvc = MockMvcBuilders.standaloneSetup(scopeMastResource)
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
    public static ScopeMast createEntity(EntityManager em) {
        ScopeMast scopeMast = new ScopeMast()
            .scopeCode(DEFAULT_SCOPE_CODE)
            .scope(DEFAULT_SCOPE);
        return scopeMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ScopeMast createUpdatedEntity(EntityManager em) {
        ScopeMast scopeMast = new ScopeMast()
            .scopeCode(UPDATED_SCOPE_CODE)
            .scope(UPDATED_SCOPE);
        return scopeMast;
    }

    @BeforeEach
    public void initTest() {
        scopeMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createScopeMast() throws Exception {
        int databaseSizeBeforeCreate = scopeMastRepository.findAll().size();

        // Create the ScopeMast
        restScopeMastMockMvc.perform(post("/api/scope-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scopeMast)))
            .andExpect(status().isCreated());

        // Validate the ScopeMast in the database
        List<ScopeMast> scopeMastList = scopeMastRepository.findAll();
        assertThat(scopeMastList).hasSize(databaseSizeBeforeCreate + 1);
        ScopeMast testScopeMast = scopeMastList.get(scopeMastList.size() - 1);
        assertThat(testScopeMast.getScopeCode()).isEqualTo(DEFAULT_SCOPE_CODE);
        assertThat(testScopeMast.getScope()).isEqualTo(DEFAULT_SCOPE);
    }

    @Test
    @Transactional
    public void createScopeMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scopeMastRepository.findAll().size();

        // Create the ScopeMast with an existing ID
        scopeMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScopeMastMockMvc.perform(post("/api/scope-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scopeMast)))
            .andExpect(status().isBadRequest());

        // Validate the ScopeMast in the database
        List<ScopeMast> scopeMastList = scopeMastRepository.findAll();
        assertThat(scopeMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllScopeMasts() throws Exception {
        // Initialize the database
        scopeMastRepository.saveAndFlush(scopeMast);

        // Get all the scopeMastList
        restScopeMastMockMvc.perform(get("/api/scope-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scopeMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].scopeCode").value(hasItem(DEFAULT_SCOPE_CODE)))
            .andExpect(jsonPath("$.[*].scope").value(hasItem(DEFAULT_SCOPE)));
    }
    
    @Test
    @Transactional
    public void getScopeMast() throws Exception {
        // Initialize the database
        scopeMastRepository.saveAndFlush(scopeMast);

        // Get the scopeMast
        restScopeMastMockMvc.perform(get("/api/scope-masts/{id}", scopeMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scopeMast.getId().intValue()))
            .andExpect(jsonPath("$.scopeCode").value(DEFAULT_SCOPE_CODE))
            .andExpect(jsonPath("$.scope").value(DEFAULT_SCOPE));
    }

    @Test
    @Transactional
    public void getNonExistingScopeMast() throws Exception {
        // Get the scopeMast
        restScopeMastMockMvc.perform(get("/api/scope-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScopeMast() throws Exception {
        // Initialize the database
        scopeMastRepository.saveAndFlush(scopeMast);

        int databaseSizeBeforeUpdate = scopeMastRepository.findAll().size();

        // Update the scopeMast
        ScopeMast updatedScopeMast = scopeMastRepository.findById(scopeMast.getId()).get();
        // Disconnect from session so that the updates on updatedScopeMast are not directly saved in db
        em.detach(updatedScopeMast);
        updatedScopeMast
            .scopeCode(UPDATED_SCOPE_CODE)
            .scope(UPDATED_SCOPE);

        restScopeMastMockMvc.perform(put("/api/scope-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedScopeMast)))
            .andExpect(status().isOk());

        // Validate the ScopeMast in the database
        List<ScopeMast> scopeMastList = scopeMastRepository.findAll();
        assertThat(scopeMastList).hasSize(databaseSizeBeforeUpdate);
        ScopeMast testScopeMast = scopeMastList.get(scopeMastList.size() - 1);
        assertThat(testScopeMast.getScopeCode()).isEqualTo(UPDATED_SCOPE_CODE);
        assertThat(testScopeMast.getScope()).isEqualTo(UPDATED_SCOPE);
    }

    @Test
    @Transactional
    public void updateNonExistingScopeMast() throws Exception {
        int databaseSizeBeforeUpdate = scopeMastRepository.findAll().size();

        // Create the ScopeMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScopeMastMockMvc.perform(put("/api/scope-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scopeMast)))
            .andExpect(status().isBadRequest());

        // Validate the ScopeMast in the database
        List<ScopeMast> scopeMastList = scopeMastRepository.findAll();
        assertThat(scopeMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteScopeMast() throws Exception {
        // Initialize the database
        scopeMastRepository.saveAndFlush(scopeMast);

        int databaseSizeBeforeDelete = scopeMastRepository.findAll().size();

        // Delete the scopeMast
        restScopeMastMockMvc.perform(delete("/api/scope-masts/{id}", scopeMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ScopeMast> scopeMastList = scopeMastRepository.findAll();
        assertThat(scopeMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
