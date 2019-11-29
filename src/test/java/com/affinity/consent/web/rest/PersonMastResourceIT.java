package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.PersonMast;
import com.affinity.consent.repository.PersonMastRepository;
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
 * Integration tests for the {@link PersonMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class PersonMastResourceIT {

    private static final Integer DEFAULT_PERS_CODE = 1;
    private static final Integer UPDATED_PERS_CODE = 2;

    private static final String DEFAULT_PERSON_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PERSON_NAME = "BBBBBBBBBB";

    @Autowired
    private PersonMastRepository personMastRepository;

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

    private MockMvc restPersonMastMockMvc;

    private PersonMast personMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonMastResource personMastResource = new PersonMastResource(personMastRepository);
        this.restPersonMastMockMvc = MockMvcBuilders.standaloneSetup(personMastResource)
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
    public static PersonMast createEntity(EntityManager em) {
        PersonMast personMast = new PersonMast()
            .persCode(DEFAULT_PERS_CODE)
            .personName(DEFAULT_PERSON_NAME);
        return personMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonMast createUpdatedEntity(EntityManager em) {
        PersonMast personMast = new PersonMast()
            .persCode(UPDATED_PERS_CODE)
            .personName(UPDATED_PERSON_NAME);
        return personMast;
    }

    @BeforeEach
    public void initTest() {
        personMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonMast() throws Exception {
        int databaseSizeBeforeCreate = personMastRepository.findAll().size();

        // Create the PersonMast
        restPersonMastMockMvc.perform(post("/api/person-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personMast)))
            .andExpect(status().isCreated());

        // Validate the PersonMast in the database
        List<PersonMast> personMastList = personMastRepository.findAll();
        assertThat(personMastList).hasSize(databaseSizeBeforeCreate + 1);
        PersonMast testPersonMast = personMastList.get(personMastList.size() - 1);
        assertThat(testPersonMast.getPersCode()).isEqualTo(DEFAULT_PERS_CODE);
        assertThat(testPersonMast.getPersonName()).isEqualTo(DEFAULT_PERSON_NAME);
    }

    @Test
    @Transactional
    public void createPersonMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personMastRepository.findAll().size();

        // Create the PersonMast with an existing ID
        personMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonMastMockMvc.perform(post("/api/person-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personMast)))
            .andExpect(status().isBadRequest());

        // Validate the PersonMast in the database
        List<PersonMast> personMastList = personMastRepository.findAll();
        assertThat(personMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPersonMasts() throws Exception {
        // Initialize the database
        personMastRepository.saveAndFlush(personMast);

        // Get all the personMastList
        restPersonMastMockMvc.perform(get("/api/person-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].persCode").value(hasItem(DEFAULT_PERS_CODE)))
            .andExpect(jsonPath("$.[*].personName").value(hasItem(DEFAULT_PERSON_NAME)));
    }
    
    @Test
    @Transactional
    public void getPersonMast() throws Exception {
        // Initialize the database
        personMastRepository.saveAndFlush(personMast);

        // Get the personMast
        restPersonMastMockMvc.perform(get("/api/person-masts/{id}", personMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personMast.getId().intValue()))
            .andExpect(jsonPath("$.persCode").value(DEFAULT_PERS_CODE))
            .andExpect(jsonPath("$.personName").value(DEFAULT_PERSON_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingPersonMast() throws Exception {
        // Get the personMast
        restPersonMastMockMvc.perform(get("/api/person-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonMast() throws Exception {
        // Initialize the database
        personMastRepository.saveAndFlush(personMast);

        int databaseSizeBeforeUpdate = personMastRepository.findAll().size();

        // Update the personMast
        PersonMast updatedPersonMast = personMastRepository.findById(personMast.getId()).get();
        // Disconnect from session so that the updates on updatedPersonMast are not directly saved in db
        em.detach(updatedPersonMast);
        updatedPersonMast
            .persCode(UPDATED_PERS_CODE)
            .personName(UPDATED_PERSON_NAME);

        restPersonMastMockMvc.perform(put("/api/person-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonMast)))
            .andExpect(status().isOk());

        // Validate the PersonMast in the database
        List<PersonMast> personMastList = personMastRepository.findAll();
        assertThat(personMastList).hasSize(databaseSizeBeforeUpdate);
        PersonMast testPersonMast = personMastList.get(personMastList.size() - 1);
        assertThat(testPersonMast.getPersCode()).isEqualTo(UPDATED_PERS_CODE);
        assertThat(testPersonMast.getPersonName()).isEqualTo(UPDATED_PERSON_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonMast() throws Exception {
        int databaseSizeBeforeUpdate = personMastRepository.findAll().size();

        // Create the PersonMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonMastMockMvc.perform(put("/api/person-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personMast)))
            .andExpect(status().isBadRequest());

        // Validate the PersonMast in the database
        List<PersonMast> personMastList = personMastRepository.findAll();
        assertThat(personMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersonMast() throws Exception {
        // Initialize the database
        personMastRepository.saveAndFlush(personMast);

        int databaseSizeBeforeDelete = personMastRepository.findAll().size();

        // Delete the personMast
        restPersonMastMockMvc.perform(delete("/api/person-masts/{id}", personMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersonMast> personMastList = personMastRepository.findAll();
        assertThat(personMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
