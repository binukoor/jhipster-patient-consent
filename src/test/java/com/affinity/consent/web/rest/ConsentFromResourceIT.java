package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.ConsentFrom;
import com.affinity.consent.repository.ConsentFromRepository;
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
 * Integration tests for the {@link ConsentFromResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class ConsentFromResourceIT {

    private static final Boolean DEFAULT_IS_VERIFIED = false;
    private static final Boolean UPDATED_IS_VERIFIED = true;

    private static final String DEFAULT_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_VERIFIED_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VERIFIED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ConsentFromRepository consentFromRepository;

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

    private MockMvc restConsentFromMockMvc;

    private ConsentFrom consentFrom;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsentFromResource consentFromResource = new ConsentFromResource(consentFromRepository);
        this.restConsentFromMockMvc = MockMvcBuilders.standaloneSetup(consentFromResource)
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
    public static ConsentFrom createEntity(EntityManager em) {
        ConsentFrom consentFrom = new ConsentFrom()
            .isVerified(DEFAULT_IS_VERIFIED)
            .verifiedBy(DEFAULT_VERIFIED_BY)
            .verifiedTime(DEFAULT_VERIFIED_TIME);
        return consentFrom;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsentFrom createUpdatedEntity(EntityManager em) {
        ConsentFrom consentFrom = new ConsentFrom()
            .isVerified(UPDATED_IS_VERIFIED)
            .verifiedBy(UPDATED_VERIFIED_BY)
            .verifiedTime(UPDATED_VERIFIED_TIME);
        return consentFrom;
    }

    @BeforeEach
    public void initTest() {
        consentFrom = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsentFrom() throws Exception {
        int databaseSizeBeforeCreate = consentFromRepository.findAll().size();

        // Create the ConsentFrom
        restConsentFromMockMvc.perform(post("/api/consent-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentFrom)))
            .andExpect(status().isCreated());

        // Validate the ConsentFrom in the database
        List<ConsentFrom> consentFromList = consentFromRepository.findAll();
        assertThat(consentFromList).hasSize(databaseSizeBeforeCreate + 1);
        ConsentFrom testConsentFrom = consentFromList.get(consentFromList.size() - 1);
        assertThat(testConsentFrom.isIsVerified()).isEqualTo(DEFAULT_IS_VERIFIED);
        assertThat(testConsentFrom.getVerifiedBy()).isEqualTo(DEFAULT_VERIFIED_BY);
        assertThat(testConsentFrom.getVerifiedTime()).isEqualTo(DEFAULT_VERIFIED_TIME);
    }

    @Test
    @Transactional
    public void createConsentFromWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consentFromRepository.findAll().size();

        // Create the ConsentFrom with an existing ID
        consentFrom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsentFromMockMvc.perform(post("/api/consent-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentFrom)))
            .andExpect(status().isBadRequest());

        // Validate the ConsentFrom in the database
        List<ConsentFrom> consentFromList = consentFromRepository.findAll();
        assertThat(consentFromList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVerifiedByIsRequired() throws Exception {
        int databaseSizeBeforeTest = consentFromRepository.findAll().size();
        // set the field null
        consentFrom.setVerifiedBy(null);

        // Create the ConsentFrom, which fails.

        restConsentFromMockMvc.perform(post("/api/consent-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentFrom)))
            .andExpect(status().isBadRequest());

        List<ConsentFrom> consentFromList = consentFromRepository.findAll();
        assertThat(consentFromList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConsentFroms() throws Exception {
        // Initialize the database
        consentFromRepository.saveAndFlush(consentFrom);

        // Get all the consentFromList
        restConsentFromMockMvc.perform(get("/api/consent-froms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consentFrom.getId().intValue())))
            .andExpect(jsonPath("$.[*].isVerified").value(hasItem(DEFAULT_IS_VERIFIED.booleanValue())))
            .andExpect(jsonPath("$.[*].verifiedBy").value(hasItem(DEFAULT_VERIFIED_BY)))
            .andExpect(jsonPath("$.[*].verifiedTime").value(hasItem(DEFAULT_VERIFIED_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getConsentFrom() throws Exception {
        // Initialize the database
        consentFromRepository.saveAndFlush(consentFrom);

        // Get the consentFrom
        restConsentFromMockMvc.perform(get("/api/consent-froms/{id}", consentFrom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consentFrom.getId().intValue()))
            .andExpect(jsonPath("$.isVerified").value(DEFAULT_IS_VERIFIED.booleanValue()))
            .andExpect(jsonPath("$.verifiedBy").value(DEFAULT_VERIFIED_BY))
            .andExpect(jsonPath("$.verifiedTime").value(DEFAULT_VERIFIED_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConsentFrom() throws Exception {
        // Get the consentFrom
        restConsentFromMockMvc.perform(get("/api/consent-froms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsentFrom() throws Exception {
        // Initialize the database
        consentFromRepository.saveAndFlush(consentFrom);

        int databaseSizeBeforeUpdate = consentFromRepository.findAll().size();

        // Update the consentFrom
        ConsentFrom updatedConsentFrom = consentFromRepository.findById(consentFrom.getId()).get();
        // Disconnect from session so that the updates on updatedConsentFrom are not directly saved in db
        em.detach(updatedConsentFrom);
        updatedConsentFrom
            .isVerified(UPDATED_IS_VERIFIED)
            .verifiedBy(UPDATED_VERIFIED_BY)
            .verifiedTime(UPDATED_VERIFIED_TIME);

        restConsentFromMockMvc.perform(put("/api/consent-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsentFrom)))
            .andExpect(status().isOk());

        // Validate the ConsentFrom in the database
        List<ConsentFrom> consentFromList = consentFromRepository.findAll();
        assertThat(consentFromList).hasSize(databaseSizeBeforeUpdate);
        ConsentFrom testConsentFrom = consentFromList.get(consentFromList.size() - 1);
        assertThat(testConsentFrom.isIsVerified()).isEqualTo(UPDATED_IS_VERIFIED);
        assertThat(testConsentFrom.getVerifiedBy()).isEqualTo(UPDATED_VERIFIED_BY);
        assertThat(testConsentFrom.getVerifiedTime()).isEqualTo(UPDATED_VERIFIED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingConsentFrom() throws Exception {
        int databaseSizeBeforeUpdate = consentFromRepository.findAll().size();

        // Create the ConsentFrom

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentFromMockMvc.perform(put("/api/consent-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentFrom)))
            .andExpect(status().isBadRequest());

        // Validate the ConsentFrom in the database
        List<ConsentFrom> consentFromList = consentFromRepository.findAll();
        assertThat(consentFromList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsentFrom() throws Exception {
        // Initialize the database
        consentFromRepository.saveAndFlush(consentFrom);

        int databaseSizeBeforeDelete = consentFromRepository.findAll().size();

        // Delete the consentFrom
        restConsentFromMockMvc.perform(delete("/api/consent-froms/{id}", consentFrom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsentFrom> consentFromList = consentFromRepository.findAll();
        assertThat(consentFromList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
