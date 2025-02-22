package giggle.backend.modules.gig.controller

import giggle.backend.modules.gig.service.GigService
import giggle.generate.api.GigApi
import giggle.generate.model.CreateGigRequest
import giggle.generate.model.Gig
import giggle.generate.model.GigResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GigController(
    private val service: GigService,
) : GigApi {
    override fun createGig(createGigRequest: CreateGigRequest): ResponseEntity<Gig> = ResponseEntity.ok(service.create(createGigRequest))

    override fun deleteGigById(id: String): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.notFound().build()
    }

    override fun getGigById(id: String): ResponseEntity<Gig> = ResponseEntity.ok(service.findById(id))

    override fun listGigs(): ResponseEntity<GigResponse> = ResponseEntity.ok(service.findAll())
}
