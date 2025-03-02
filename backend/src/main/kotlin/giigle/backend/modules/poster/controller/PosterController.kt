package giigle.backend.modules.poster.controller

import giigle.backend.modules.poster.service.PosterService
import giigle.generated.api.PosterApi
import giigle.generated.model.CreatePosterRequest
import giigle.generated.model.Poster
import giigle.generated.model.PosterResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class PosterController(
    private val service: PosterService,
) : PosterApi {
    override fun createPoster(createPosterRequest: CreatePosterRequest): ResponseEntity<Poster> =
        ResponseEntity.ok(service.create(createPosterRequest))

    override fun deletePosterById(id: String): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }

    override fun getPosterById(id: String): ResponseEntity<Poster> = ResponseEntity.ok(service.findById(id))

    override fun listPosters(): ResponseEntity<PosterResponse> = ResponseEntity.ok(service.findAll())
}
