package giigle.backend.core.repository

import giigle.backend.core.entity.BaseEntity
import org.springframework.data.repository.ListCrudRepository
import org.springframework.data.repository.NoRepositoryBean
import org.springframework.data.repository.PagingAndSortingRepository

@NoRepositoryBean
interface BaseRepository<T : BaseEntity> :
    ListCrudRepository<T, String>,
    PagingAndSortingRepository<T, String>
