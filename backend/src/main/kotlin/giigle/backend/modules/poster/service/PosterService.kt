package giigle.backend.modules.poster.service

import giigle.backend.core.service.CrudService
import giigle.backend.modules.poster.mapper.PosterMapper
import giigle.backend.modules.poster.repository.PosterRepository
import giigle.generated.model.CreatePosterRequest
import giigle.generated.model.Poster
import giigle.generated.model.PosterResponse
import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service

@Service
class PosterService(
    private val mapper: PosterMapper,
    private val repository: PosterRepository,
) : CrudService<
        CreatePosterRequest,
        Poster,
        PosterResponse,
    > {
    override fun create(request: CreatePosterRequest): Poster {
        val entity = mapper.createModelToEntity(request)
        val savedEntity = repository.save(entity)
        return mapper.entityToModel(savedEntity)
    }

    override fun delete(id: String) {
        repository
            .findById(id)
            .ifPresentOrElse(
                { entity -> repository.deleteById(entity.id) },
                { throw EntityNotFoundException("Entity with id $id not found") },
            )
    }

    override fun findAll(): PosterResponse {
        val posters =
            repository
                .findAll()
                .map(mapper::entityToModel)

        return PosterResponse(posters)
    }

    override fun findById(id: String): Poster =
        repository
            .findById(id)
            .map(mapper::entityToModel)
            .orElseThrow()
}
