package com.affinity.consent.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.affinity.consent.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.affinity.consent.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.affinity.consent.domain.User.class.getName());
            createCache(cm, com.affinity.consent.domain.Authority.class.getName());
            createCache(cm, com.affinity.consent.domain.User.class.getName() + ".authorities");
            createCache(cm, com.affinity.consent.domain.StatusMast.class.getName());
            createCache(cm, com.affinity.consent.domain.ScopeMast.class.getName());
            createCache(cm, com.affinity.consent.domain.CategoryMast.class.getName());
            createCache(cm, com.affinity.consent.domain.ProcMast.class.getName());
            createCache(cm, com.affinity.consent.domain.IcdMast.class.getName());
            createCache(cm, com.affinity.consent.domain.PersonMast.class.getName());
            createCache(cm, com.affinity.consent.domain.EstMast.class.getName());
            createCache(cm, com.affinity.consent.domain.PatientBar.class.getName());
            createCache(cm, com.affinity.consent.domain.VisitBar.class.getName());
            createCache(cm, com.affinity.consent.domain.Consent.class.getName());
            createCache(cm, com.affinity.consent.domain.Consent.class.getName() + ".procs");
            createCache(cm, com.affinity.consent.domain.Consent.class.getName() + ".diags");
            createCache(cm, com.affinity.consent.domain.Consent.class.getName() + ".verifiers");
            createCache(cm, com.affinity.consent.domain.ConsentProcs.class.getName());
            createCache(cm, com.affinity.consent.domain.ConsentDiag.class.getName());
            createCache(cm, com.affinity.consent.domain.ConsentFrom.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
