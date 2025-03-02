package giigle.backend.modules.poster

import giigle.backend.modules.poster.entity.PosterEntity
import giigle.backend.modules.poster.entity.PosterType
import giigle.generated.model.CreatePosterRequest
import giigle.generated.model.Poster

object CreatePosterRequestCreator {
    fun create(
        name: String = "John Doe",
        username: String = "john.doe",
    ): CreatePosterRequest =
        CreatePosterRequest()
            .name(name)
            .username(username)
}

object PosterCreator {
    private val base = CreatePosterRequestCreator.create()

    fun create(
        id: String = "posterId",
        name: String = base.name,
        username: String = base.username,
    ): Poster =
        Poster()
            .id(id)
            .name(name)
            .username(username)
}

object PosterEntityCreator {
    private val base = PosterCreator.create()

    fun create(
        id: String = "123",
        name: String = base.name,
        type: PosterType = PosterType.PERSON,
        username: String = base.username,
    ): PosterEntity =
        PosterEntity(
            name = name,
            type = type,
            username = username,
        ).apply {
            this.id = id
        }
}
