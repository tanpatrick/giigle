package giigle.backend.modules.gig.controller

import giigle.backend.modules.gig.service.GigService
import giigle.generated.api.GigApi
import giigle.generated.model.CreateGigRequest
import giigle.generated.model.Gig
import giigle.generated.model.GigResponse
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
