package giigle.backend.modules.gig.service

import giigle.backend.core.service.CrudService
import giigle.backend.modules.gig.mapper.GigMapper
import giigle.backend.modules.gig.repository.GigRepository
import giigle.generated.model.CreateGigRequest
import giigle.generated.model.Gig
import giigle.generated.model.GigResponse
import org.springframework.stereotype.Service

@Service
class GigService(
    private val mapper: GigMapper,
    private val repository: GigRepository,
) : CrudService<CreateGigRequest, Gig, GigResponse> {
    override fun create(request: CreateGigRequest): Gig {
        val entity = mapper.createModelToEntity(request)
        val savedEntity = repository.save(entity)
        return mapper.entityToModel(savedEntity)
    }

    override fun delete(id: String) {
        repository.deleteById(id)
    }

    override fun findAll(): GigResponse {
        val gigs =
            repository
                .findAll()
                .map(mapper::entityToModel)

        return GigResponse(gigs)
    }

    override fun findById(id: String): Gig =
        repository
            .findById(id)
            .map(mapper::entityToModel)
            .orElseThrow()
}
