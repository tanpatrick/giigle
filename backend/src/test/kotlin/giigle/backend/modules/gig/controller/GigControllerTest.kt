package giigle.backend.modules.gig.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.ninjasquad.springmockk.MockkBean
import giigle.backend.modules.gig.CreateGigRequestCreator
import giigle.backend.modules.gig.GigCreator
import giigle.backend.modules.gig.service.GigService
import giigle.generated.model.GigResponse
import io.mockk.every
import io.mockk.verify
import org.hamcrest.Matchers.emptyString
import org.hamcrest.Matchers.not
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.ComponentScan
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import kotlin.test.Test

@WebMvcTest(controllers = [GigControllerTest::class])
@ActiveProfiles("test")
@ComponentScan(basePackages = ["giigle.backend.modules.gig.controller"])
class GigControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var gigService: GigService

    private val objectMapper =
        ObjectMapper()
            .registerModule(JavaTimeModule())

    val gig = GigCreator.create()

    @Test
    fun `should create a gig successfully`() {
        val request = CreateGigRequestCreator.create()
        every { gigService.create(any()) } returns GigCreator.create()

        mockMvc
            .perform(
                post("/gigs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.date").value(request.date.toString()))
            .andExpect(jsonPath("$.description").value(request.description))
            .andExpect(jsonPath("$.id").value(not(emptyString())))
            .andExpect(jsonPath("$.location.address").value(request.location.address))
            .andExpect(jsonPath("$.location.coordinates.latitude").value(request.location.coordinates.latitude))
            .andExpect(jsonPath("$.location.coordinates.longitude").value(request.location.coordinates.longitude))
            .andExpect(jsonPath("$.pay").value(request.pay))
            .andExpect(jsonPath("$.payType").value(request.payType.value))
            .andExpect(jsonPath("$.title").value(request.title))

        verify { gigService.create(any()) }
    }

    @Test
    fun `should delete a gig by id`() {
        every { gigService.delete(any()) } returns Unit

        mockMvc
            .perform(delete("/gigs/1"))
            .andExpect(status().isNoContent)

        verify { gigService.delete("1") }
    }

    @Test
    fun `should return gig by id`() {
        every { gigService.findById("1") } returns gig

        mockMvc
            .perform(get("/gigs/1"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.date").value(gig.date.toString()))
            .andExpect(jsonPath("$.description").value(gig.description))
            .andExpect(jsonPath("$.id").value(not(emptyString())))
            .andExpect(jsonPath("$.location.address").value(gig.location.address))
            .andExpect(jsonPath("$.location.coordinates.latitude").value(gig.location.coordinates.latitude))
            .andExpect(jsonPath("$.location.coordinates.longitude").value(gig.location.coordinates.longitude))
            .andExpect(jsonPath("$.pay").value(gig.pay))
            .andExpect(jsonPath("$.payType").value(gig.payType.value))
            .andExpect(jsonPath("$.title").value(gig.title))

        verify { gigService.findById("1") }
    }

    @Test
    fun `should list all gigs`() {
        val gigResponse =
            GigResponse()
                .gigs(listOf(gig))

        every { gigService.findAll() } returns gigResponse

        mockMvc
            .perform(get("/gigs"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.gigs[0].date").value(gig.date.toString()))
            .andExpect(jsonPath("$.gigs[0].description").value(gig.description))
            .andExpect(jsonPath("$.gigs[0].id").value(not(emptyString())))
            .andExpect(jsonPath("$.gigs[0].location.address").value(gig.location.address))
            .andExpect(jsonPath("$.gigs[0].location.coordinates.latitude").value(gig.location.coordinates.latitude))
            .andExpect(jsonPath("$.gigs[0].location.coordinates.longitude").value(gig.location.coordinates.longitude))
            .andExpect(jsonPath("$.gigs[0].pay").value(gig.pay))
            .andExpect(jsonPath("$.gigs[0].payType").value(gig.payType.value))
            .andExpect(jsonPath("$.gigs[0].title").value(gig.title))

        verify { gigService.findAll() }
    }
}
