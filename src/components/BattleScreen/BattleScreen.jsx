// CSS / React / Pixi
import "./battleScreen.css";

import { Stage, Container, Sprite } from '@pixi/react';
import { Rectangle, Assets } from 'pixi.js';
import '@pixi/events';

// React & Redux imports
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Static data imports
import manifest from "../../data/manifest.js";

export default function BattleScreen({ gameEngine }) {
    const { tiles, entities, screenWidth, screenHeight, spriteSize } = useSelector((state) => state.battle);
    const [battleTextures, setBattleTextures] = useState(null);
    const { input } = gameEngine;

    useEffect(() => {
        const battleBundle = manifest.bundles.find(bundle => bundle.name === "battle");
        Assets.addBundle(battleBundle.name, battleBundle.assets)
        const loadTextures = async () => {
            const assets = await Assets.loadBundle(battleBundle.name);
            return assets;
        }
        loadTextures().then(value => setBattleTextures(value));
    }, [])

    return (
        <Stage
            x={0}
            y={0}
            width={screenWidth * spriteSize}
            height={screenHeight * spriteSize}
            options={{ background: "#181425" }}
        >
            {battleTextures &&
                <Container
                    x={0}
                    y={0}
                    sortableChildren={true}
                    eventMode={'static'}
                    hitArea={new Rectangle(0, 0, screenWidth * spriteSize, screenHeight * spriteSize)}
                    pointermove={(e) => input.pointerMove(e.global)}
                >
                    {tiles.map((tile) => {
                        if (tile.sprite) return (
                            <Sprite
                                key={tile.id}
                                texture={battleTextures[tile.sprite]}
                                x={tile.x}
                                y={tile.y}
                                zIndex={2}
                                scale={1}
                                alpha={tile.alpha}
                            />
                        )
                    })}
                    {entities.map((entity) => {
                        return (
                            <Sprite
                                key={entity.id}
                                eventMode={entity.interactable ? "static" : "none"}
                                pointerdown={() => { input.pointerDown({ id: entity.id }) }}
                                pointerover={() => input.pointerOver({ id: entity.id })}
                                pointerout={input.pointerOut}
                                texture={battleTextures[entity.sprite]}
                                x={entity.x}
                                y={entity.y}
                                zIndex={entity.z}
                                scale={entity.scale}
                                alpha={entity.alpha}
                                anchor={entity.anchor}
                            />
                        )
                    })}
                </Container>
            }

        </Stage>
    )
}