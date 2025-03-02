package giigle.backend.modules.poster.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.ninjasquad.springmockk.MockkBean
import giigle.backend.modules.poster.CreatePosterRequestCreator
import giigle.backend.modules.poster.PosterCreator
import giigle.backend.modules.poster.service.PosterService
import giigle.generated.model.PosterResponse
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

@ActiveProfiles("test")
@ComponentScan(basePackages = ["giigle.backend.modules.poster.controller"])
@WebMvcTest(controllers = [PosterControllerTest::class])
class PosterControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var service: PosterService

    private val objectMapper =
        ObjectMapper()
            .registerModule(JavaTimeModule())

    val poster = PosterCreator.create()

    @Test
    fun `should create a poster successfully`() {
        val request = CreatePosterRequestCreator.create()
        every { service.create(any()) } returns PosterCreator.create()

        mockMvc
            .perform(
                post("/posters")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value(request.name))
            .andExpect(jsonPath("$.username").value(request.username))
            .andExpect(jsonPath("$.id").value(not(emptyString())))

        verify { service.create(match { it.username == request.username }) }
    }

    @Test
    fun `should delete a poster by id`() {
        every { service.delete(any()) } returns Unit

        mockMvc
            .perform(delete("/posters/1"))
            .andExpect(status().isNoContent)

        verify { service.delete("1") }
    }

    @Test
    fun `should return poster by id`() {
        every { service.findById("1") } returns poster

        mockMvc
            .perform(get("/posters/1"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value(poster.name))
            .andExpect(jsonPath("$.username").value(poster.username))
            .andExpect(jsonPath("$.id").value(not(emptyString())))

        verify { service.findById("1") }
    }

    @Test
    fun `should list all posters`() {
        val posterResponse =
            PosterResponse()
                .posters(listOf(poster))

        every { service.findAll() } returns posterResponse

        mockMvc
            .perform(get("/posters"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.posters[0].name").value(poster.name))
            .andExpect(jsonPath("$.posters[0].username").value(poster.username))
            .andExpect(jsonPath("$.posters[0].id").value(not(emptyString())))

        verify { service.findAll() }
    }
}
