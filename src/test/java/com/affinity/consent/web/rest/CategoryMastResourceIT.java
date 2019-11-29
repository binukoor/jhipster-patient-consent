package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.CategoryMast;
import com.affinity.consent.repository.CategoryMastRepository;
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
 * Integration tests for the {@link CategoryMastResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class CategoryMastResourceIT {

    private static final Integer DEFAULT_CAT_CODE = 1;
    private static final Integer UPDATED_CAT_CODE = 2;

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private CategoryMastRepository categoryMastRepository;

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

    private MockMvc restCategoryMastMockMvc;

    private CategoryMast categoryMast;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoryMastResource categoryMastResource = new CategoryMastResource(categoryMastRepository);
        this.restCategoryMastMockMvc = MockMvcBuilders.standaloneSetup(categoryMastResource)
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
    public static CategoryMast createEntity(EntityManager em) {
        CategoryMast categoryMast = new CategoryMast()
            .catCode(DEFAULT_CAT_CODE)
            .category(DEFAULT_CATEGORY);
        return categoryMast;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CategoryMast createUpdatedEntity(EntityManager em) {
        CategoryMast categoryMast = new CategoryMast()
            .catCode(UPDATED_CAT_CODE)
            .category(UPDATED_CATEGORY);
        return categoryMast;
    }

    @BeforeEach
    public void initTest() {
        categoryMast = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoryMast() throws Exception {
        int databaseSizeBeforeCreate = categoryMastRepository.findAll().size();

        // Create the CategoryMast
        restCategoryMastMockMvc.perform(post("/api/category-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryMast)))
            .andExpect(status().isCreated());

        // Validate the CategoryMast in the database
        List<CategoryMast> categoryMastList = categoryMastRepository.findAll();
        assertThat(categoryMastList).hasSize(databaseSizeBeforeCreate + 1);
        CategoryMast testCategoryMast = categoryMastList.get(categoryMastList.size() - 1);
        assertThat(testCategoryMast.getCatCode()).isEqualTo(DEFAULT_CAT_CODE);
        assertThat(testCategoryMast.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    public void createCategoryMastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoryMastRepository.findAll().size();

        // Create the CategoryMast with an existing ID
        categoryMast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoryMastMockMvc.perform(post("/api/category-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryMast)))
            .andExpect(status().isBadRequest());

        // Validate the CategoryMast in the database
        List<CategoryMast> categoryMastList = categoryMastRepository.findAll();
        assertThat(categoryMastList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCategoryMasts() throws Exception {
        // Initialize the database
        categoryMastRepository.saveAndFlush(categoryMast);

        // Get all the categoryMastList
        restCategoryMastMockMvc.perform(get("/api/category-masts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoryMast.getId().intValue())))
            .andExpect(jsonPath("$.[*].catCode").value(hasItem(DEFAULT_CAT_CODE)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)));
    }
    
    @Test
    @Transactional
    public void getCategoryMast() throws Exception {
        // Initialize the database
        categoryMastRepository.saveAndFlush(categoryMast);

        // Get the categoryMast
        restCategoryMastMockMvc.perform(get("/api/category-masts/{id}", categoryMast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoryMast.getId().intValue()))
            .andExpect(jsonPath("$.catCode").value(DEFAULT_CAT_CODE))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY));
    }

    @Test
    @Transactional
    public void getNonExistingCategoryMast() throws Exception {
        // Get the categoryMast
        restCategoryMastMockMvc.perform(get("/api/category-masts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoryMast() throws Exception {
        // Initialize the database
        categoryMastRepository.saveAndFlush(categoryMast);

        int databaseSizeBeforeUpdate = categoryMastRepository.findAll().size();

        // Update the categoryMast
        CategoryMast updatedCategoryMast = categoryMastRepository.findById(categoryMast.getId()).get();
        // Disconnect from session so that the updates on updatedCategoryMast are not directly saved in db
        em.detach(updatedCategoryMast);
        updatedCategoryMast
            .catCode(UPDATED_CAT_CODE)
            .category(UPDATED_CATEGORY);

        restCategoryMastMockMvc.perform(put("/api/category-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCategoryMast)))
            .andExpect(status().isOk());

        // Validate the CategoryMast in the database
        List<CategoryMast> categoryMastList = categoryMastRepository.findAll();
        assertThat(categoryMastList).hasSize(databaseSizeBeforeUpdate);
        CategoryMast testCategoryMast = categoryMastList.get(categoryMastList.size() - 1);
        assertThat(testCategoryMast.getCatCode()).isEqualTo(UPDATED_CAT_CODE);
        assertThat(testCategoryMast.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoryMast() throws Exception {
        int databaseSizeBeforeUpdate = categoryMastRepository.findAll().size();

        // Create the CategoryMast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoryMastMockMvc.perform(put("/api/category-masts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryMast)))
            .andExpect(status().isBadRequest());

        // Validate the CategoryMast in the database
        List<CategoryMast> categoryMastList = categoryMastRepository.findAll();
        assertThat(categoryMastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCategoryMast() throws Exception {
        // Initialize the database
        categoryMastRepository.saveAndFlush(categoryMast);

        int databaseSizeBeforeDelete = categoryMastRepository.findAll().size();

        // Delete the categoryMast
        restCategoryMastMockMvc.perform(delete("/api/category-masts/{id}", categoryMast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CategoryMast> categoryMastList = categoryMastRepository.findAll();
        assertThat(categoryMastList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
