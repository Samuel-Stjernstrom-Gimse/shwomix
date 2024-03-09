export abstract class UI {
	protected ctx: CanvasRenderingContext2D

	protected constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx
	}

	abstract draw(): void
}