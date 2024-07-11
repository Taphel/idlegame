// ECS Import
import ComponentSet from "./ComponentSet.js";

// Systems import
import GenerationSystem from "./systems/GenerationSystem.js";
import GameSystem from "./systems/GameSystem.js";
import DisplaySystem from "./systems/DisplaySystem.js";
import InputSystem from "./systems/InputSystem.js";
import UISystem from "./systems/UISystem.js";

// data
import { GameState, UnitFaction } from "../data/enums.js";
import constants from "../data/constants.js";
import unitData from "../data/unitData.js";

class GameEngine {
    #entities = [];
    #components = {
        animation: new ComponentSet(100),
        transform: new ComponentSet(100),
        unit: new ComponentSet(100),
    };
    #systems = {
        generation: new GenerationSystem(),
        display: new DisplaySystem(),
        game: new GameSystem(),
        input: new InputSystem(),
        ui: new UISystem()
    };
    #gameState = GameState.mapStart;
    #dungeonFloor = 0;
    #dungeonTier = 1;
    #dungeonLevel;
    #unitPool = [];
    #previousTickTime = 0;

    constructor() {
        // Import systems
        const { generation, display } = this.#systems;
        // Import level generation constants then generate the dungeon
        const { floors, floorWidth, pathCount, unitCount, boardSize, sideBoardSize, startPlayerUnits } = constants;
        this.#dungeonLevel = generation.generateLevel(floors, floorWidth, pathCount, this.#dungeonTier);
        this.#unitPool = generation.generateUnitPool(this.#entities, this.#components, unitData, unitCount, boardSize, sideBoardSize, startPlayerUnits);

        // Import display constants then initialize map display
        const { screenWidth, screenHeight, xMapOffset, yMapOffset, spriteSize, playerStartX, enemyStartX, boardY, sideBoardX, sideBoardY } = constants;
        display.initializeDisplay(this.#dungeonLevel, this.#entities, screenWidth, screenHeight, xMapOffset, yMapOffset, spriteSize, playerStartX, enemyStartX, boardY, sideBoardX, sideBoardY);

        setInterval(() => {
            this.#updateLoop()
        }, 30);
    }

    get input() {
        return this.#systems.input;
    }

    get display() {
        return this.#systems.display;
    }

    #clearEntities() {
        const { animation, transform, unit } = this.#components;
        this.#entities.forEach(entity => {
            animation.remove(entity);
            transform.remove(entity);
            unit.remove(entity);
        })

        this.#entities = [];
    }


    #updateLoop() {
        const currentTickTime = performance.now();
        const deltaTime = (currentTickTime - this.#previousTickTime);
        this.#previousTickTime = currentTickTime;
        const { game, display, input } = this.#systems;
    
        // Register inputs
        const pointerInput = input.update(this.#gameState);
        // Read input and update game state
        this.#gameState = game.update(this.#gameState, this.#dungeonLevel, this.#unitPool, pointerInput, this.#entities, this.#components);

        // Update display
        this.#gameState = display.update(this.#gameState, this.#dungeonLevel, this.#entities, this.#components, this.#unitPool, pointerInput, deltaTime);
    }
}

const gameEngine = new GameEngine();
export default gameEngine;