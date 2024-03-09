import { Game } from './game.js'

window.onload = () => {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement
	const game = new Game(canvas)
	game.start()
}