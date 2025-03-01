package giigle.backend.core.mapper

abstract class GenericMapper<CreateModel, Model, Entity> {
    abstract fun createModelToEntity(model: CreateModel): Entity

    abstract fun entityToModel(entity: Entity): Model

    abstract fun modelToEntity(model: Model): Entity
}
