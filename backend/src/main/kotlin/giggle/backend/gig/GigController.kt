package giggle.backend.gig

import giggle.generate.api.GigApi
import giggle.generate.model.CreateGigRequest
import giggle.generate.model.GigResponse
import java.util.UUID
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GigController : GigApi {

    val list = mutableListOf<GigResponse>()

    override fun createGig(createGigRequest: CreateGigRequest): ResponseEntity<GigResponse> {
        val response = GigResponse()
            .date(createGigRequest.date)
            .description(createGigRequest.description)
            .id(UUID.randomUUID().toString())
            .location(createGigRequest.location)
            .pay(createGigRequest.pay)
            .payType(createGigRequest.payType)
            .title(createGigRequest.title)

        list.add(response)

        return ResponseEntity.ok(response)
    }

    override fun getGigById(id: String): ResponseEntity<GigResponse?> {
        return ResponseEntity.ok(list.find { gig -> gig.id == id })
    }

    override fun listGigs(): ResponseEntity<List<GigResponse?>>? {
        return ResponseEntity.ok(list)
    }
}