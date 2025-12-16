namespace SpriteKind {
    export const UI = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const HealBullet = SpriteKind.create()
    export const DrillSuper = SpriteKind.create()
    export const Obelisk = SpriteKind.create()
    export const EnemyBullet = SpriteKind.create()
}
namespace StatusBarKind {
    export const Ammo = StatusBarKind.create()
    export const SuperAmmo = StatusBarKind.create()
    export const ObeliskHealth = StatusBarKind.create()
}
function BodySelect () {
    game.setDialogFrame(img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 5 
        1 f f f f f f f f f f f f f 1 
        1 f f f f f f f f f f f f f 1 
        1 f f f f f f f f f f f f f 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `)
    SelectionMenuBodiesArray = []
    TempNumber = 0
    for (let index = 0; index < BodyNamesArray.length; index++) {
        SelectionMenuBodiesArray.push(miniMenu.createMenuItem(BodyNamesArray[TempNumber], BodyImagesArray[TempNumber]))
        TempNumber += 1
    }
    SelectionMenuBodies = miniMenu.createMenuFromArray(SelectionMenuBodiesArray)
    SelectionMenuBodies.setFrame(assets.image`MenuFrame`)
    SelectionMenuBodies.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
    SelectionMenuBodies.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 9)
    SelectionMenuBodies.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 9)
    SelectionMenuBodies.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
    SelectionMenuBodies.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 9)
    SelectionMenuBodies.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 4)
    SelectionMenuBodies.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1)
    SelectionMenuBodies.setMenuStyleProperty(miniMenu.MenuStyleProperty.UseAsTemplate, 1)
    SelectionMenuBodies.onButtonPressed(controller.A, function (selection, selectedIndex) {
        _1Body = selectedIndex
        SelectionMenuCombinationSprite.image.drawTransparentImage(BodyImagesArray[selectedIndex], 0, 24)
        SelectionMenuBodies.close()
        pause(5)
        WeaponSelect()
    })
    SelectionMenuBodies.onButtonPressed(controller.B, function (selection, selectedIndex) {
        game.showLongText("" + selection + "/ " + BodyHealthArray[selectedIndex] + " HP, " + BodySpeedArray[selectedIndex] + " SPD.        " + BodyDescriptionsArray[selectedIndex], DialogLayout.Center)
    })
    SelectionMenuBodies.setPosition(81, scene.screenHeight() / 2)
    SelectionMenuCombinationSprite = sprites.create(assets.image`CombinationImage`, SpriteKind.UI)
    SelectionMenuCombinationSprite.setPosition(140, 60)
    SelectionMenuText = textsprite.create("Select your body!", 0, 9)
    SelectionMenuText.setPosition(80, 8)
}
function DefineShape (Image2: Image, Health: number, Speed: number, Name: string, BodyDescription: string, WeaponDescription: string) {
    BodyImagesArray.push(Image2)
    BodyHealthArray.push(Health)
    BodySpeedArray.push(Speed)
    BodyNamesArray.push(Name)
    BodyDescriptionsArray.push(BodyDescription)
    WeaponDescriptionsArray.push(WeaponDescription)
}
function WeaponSelect () {
    SelectionMenuWeapons = miniMenu.createMenuFromArray(SelectionMenuBodiesArray)
    SelectionMenuWeapons.setFrame(assets.image`MenuFrame`)
    SelectionMenuWeapons.setPosition(81, scene.screenHeight() / 2)
    SelectionMenuText.setText("Select a Weapon.")
    SelectionMenuWeapons.onButtonPressed(controller.A, function (selection, selectedIndex) {
        _1Weapon = selectedIndex
        SelectionMenuCombinationSprite.image.drawTransparentImage(BodyImagesArray[selectedIndex], 0, 0)
        SelectionMenuWeapons.close()
        Confirmation()
    })
    SelectionMenuWeapons.onButtonPressed(controller.B, function (selection, selectedIndex) {
        game.showLongText("" + selection + "           " + WeaponDescriptionsArray[selectedIndex], DialogLayout.Center)
    })
}
function EnemyFactory (EnemyID: number) {
    _3Enemy = sprites.create([
    assets.image`myImage20`,
    assets.image`myImage19`,
    assets.image`EnemyTri`,
    assets.image`myImage18`,
    assets.image`EnemyCross`
    ][EnemyID], SpriteKind.Enemy)
    sprites.setDataNumber(_3Enemy, "Damage", [
    5,
    10,
    10,
    15,
    0
    ][EnemyID])
    sprites.setDataNumber(_3Enemy, "Speed", [
    60,
    75,
    0,
    45,
    30
    ][EnemyID])
    _3Enemy.follow(_3PlayerBody, sprites.readDataNumber(_3Enemy, "Speed"))
    if (_1Gamemode == 2) {
        _3Enemy.follow(_3Obelisk, Math.max(sprites.readDataNumber(_3Enemy, "Speed") / 1.5, 30))
    }
    _3EnemyHealthBar = statusbars.create(30, 5, StatusBarKind.EnemyHealth)
    _3EnemyHealthBar.setColor(2, 15)
    _3EnemyHealthBar.setBarBorder(1, 2)
    _3EnemyHealthBar.max = [
    100,
    20,
    100,
    300,
    10
    ][EnemyID]
    _3EnemyHealthBar.value = _3EnemyHealthBar.max
    _3EnemyHealthBar.attachToSprite(_3Enemy)
    sprites.setDataNumber(_3Enemy, "EnemyID", EnemyID)
    sprites.setDataBoolean(_3Enemy, "HitRecently", false)
    _3Enemy.fx = 200
    _3Enemy.fy = 200
    if (EnemyID == 3) {
        _3Enemy.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
    tiles.placeOnRandomTile(_3Enemy, assets.tile`EnemySpawn`)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (_1GameStarted) {
        if (blockSettings.readString("SaveControls") == "Mobile") {
            RegularAttacj()
        }
    }
})
function SiegeWaveManager () {
    _1Score += 1
    _3ScoreTracker.setText("W:" + _1Score)
    _3ScoreTracker.setPosition(151 - ((convertToText(_1Score).length - 1) * 5 - (convertToText(_1Score).length - 1) * 2), 116)
    WaveStartText = textsprite.create("WAVE " + _1Score, 15, 2)
    WaveStartText.setFlag(SpriteFlag.RelativeToCamera, true)
    WaveStartText.setPosition(80, 12)
    WaveStartText.lifespan = 5000
    timer.background(function () {
        pause(1000)
        easing.blockEaseBy(WaveStartText, 0, -100, 2000, easing.Mode.InBack)
        if (_1Score == 1) {
            StartWave(3, [0])
        } else if (_1Score == 2) {
            StartWave(5, [
            0,
            0,
            0,
            1
            ])
        } else if (_1Score == 3) {
            StartWave(6, [
            0,
            1,
            1,
            1
            ])
        } else if (_1Score == 4) {
            StartWave(7, [
            0,
            0,
            1,
            1,
            4
            ])
        } else if (_1Score == 5) {
            StartWave(3, [3])
        } else if (_1Score == 6) {
            StartWave(2, [3])
            StartWave(4, [1])
        } else if (_1Score == 7) {
            StartWave(4, [
            0,
            1,
            3,
            4
            ])
        } else if (_1Score == 8) {
            StartWave(8, [0])
        } else if (_1Score == 9) {
            StartWave(5, [3, 1, 0])
        } else if (_1Score == 10) {
            StartWave(3, [3])
            StartWave(5, [4])
        } else if (_1Score == 11) {
            StartWave(9, [4, 1])
        } else if (_1Score == 12) {
            StartWave(8, [0])
            StartWave(4, [1])
            StartWave(2, [3])
        } else if (_1Score == 13) {
            StartWave(6, [3])
        } else if (_1Score == 14) {
            StartWave(8, [1, 1, 3])
        } else if (_1Score == 15) {
            StartWave(10, [1])
            StartWave(5, [3])
            StartWave(5, [4])
        } else {
            StartWave(randint(5, 7) + Math.floor(_1Score / 5), [
            randint(0, 1),
            randint(3, 4),
            randint(0, 1),
            randint(3, 4)
            ])
        }
    })
}
function death () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Obelisk)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Weapon)
    scene.cameraShake(4, 500)
    _1GameStarted = false
    GameOverMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Score:" + _1Score),
    miniMenu.createMenuItem("Gamemode:" + [
    "D. Constant",
    "D. Waves",
    "D. Siege",
    "Legacy"
    ][_1Gamemode]),
    miniMenu.createMenuItem("Controls:" + blockSettings.readString("SaveControls")),
    miniMenu.createMenuItem("Body:" + BodyNamesArray[_1Body]),
    miniMenu.createMenuItem("Weapon:" + BodyNamesArray[_1Weapon])
    )
    GameOverMenu.setDimensions(140, 100)
    GameOverMenu.setPosition(80, 60)
    GameOverMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 5)
    GameOverMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1)
    GameOverMenu.setTitle("Game Over!")
    GameOverMenu.setFrame(assets.image`MenuFrame`)
    GameOverMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 15)
    GameOverMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, 9)
    GameOverMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 15)
    GameOverMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 0)
    GameOverMenu.z = 999
    GameOverMenu.setFlag(SpriteFlag.RelativeToCamera, true)
    timer.background(function () {
        pause(500)
        GameOverMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            color.startFadeFromCurrent(color.Black, 500)
            pause(500)
            game.reset()
        })
    })
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (!(_1Gamemode == 3)) {
        spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, otherSprite), 0 - spriteutils.speed(sprite))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyBullet, function (sprite, otherSprite) {
    if (!(IsPlayerImmune)) {
        if (_1Gamemode == 3) {
            _3HealthBar.value += 0 - 0.7
        } else {
            _3HealthBar.value += 0 - sprites.readDataNumber(otherSprite, "Damage")
            sprites.destroy(otherSprite)
        }
    }
})
function GamemodeSelect () {
    color.startFade(color.originalPalette, color.Arcade)
    SelectionMenuGamemode = miniMenu.createMenu(
    miniMenu.createMenuItem("Original", assets.image`Icon`),
    miniMenu.createMenuItem("Waves", assets.image`Icon1`),
    miniMenu.createMenuItem("Base Defend", assets.image`Icon0`),
    miniMenu.createMenuItem("Hardcore Legacy", assets.image`Icon2`),
    miniMenu.createMenuItem("Enemy Catalog", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . f d d d d d d d d d . . . . 
        . . f d d d d d d d d d . . . . 
        . . f d d d f f f d d d . . . . 
        . . f d d d d d d d d d . . . . 
        . . f d d d f f f d d d . . . . 
        . . f d d d d d d d d d . . . . 
        . . f d d d f f f d d d . . . . 
        . . f d d d d d d d d d . . . . 
        . . f d d d d d d d d d . . . . 
        . . f d d d d d d d d d . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    )
    SelectionMenuGamemode.setFrame(assets.image`MenuFrame0`)
    SelectionMenuGamemode.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
    SelectionMenuGamemode.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 2)
    SelectionMenuGamemode.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 2)
    SelectionMenuGamemode.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
    SelectionMenuText = textsprite.create("Select a gamemode.", 0, 2)
    SelectionMenuText.setPosition(80, 8)
    SelectionMenuGamemode.setPosition(80, 60)
    SelectionMenuGamemode.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selection == "Enemy Catalog") {
            Enemycatalog()
        } else {
            timer.throttle("dont break things pls", 500, function () {
                game.setDialogFrame(img`
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    f f f f f f f f f f f f f f f 
                    `)
                game.setDialogTextColor(1)
                game.showLongText("Press B to learn about the abilities of each character.", DialogLayout.Bottom)
                color.startFade(color.originalPalette, color.Black, 250)
                pause(250)
                sprites.destroy(SelectionMenuText)
                SelectionMenuGamemode.close()
                _1Gamemode = selectedIndex
                pause(5)
                BodySelect()
                color.startFade(color.Black, color.originalPalette, 250)
            })
        }
    })
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (_1GameStarted) {
        if (blockSettings.readString("SaveControls") == "Mobile") {
            SuperAtacj()
        }
    }
})
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (_1GameStarted) {
        if (blockSettings.readString("SaveControls") == "PC") {
            RegularAttacj()
        }
    }
})
sprites.onOverlap(SpriteKind.HealBullet, SpriteKind.Enemy, function (sprite, otherSprite) {
    _3HealthBar.value += sprites.readDataNumber(sprite, "Damage") / 10
    if (sprite.image.equals(assets.image`DrillProjectile`)) {
        if (!(sprites.readDataBoolean(otherSprite, "HitRecently"))) {
            sprites.setDataBoolean(otherSprite, "HitRecently", true)
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += 0 - sprites.readDataNumber(sprite, "Damage")
            timer.background(function () {
                timer.after(150, function () {
                    sprites.setDataBoolean(otherSprite, "HitRecently", false)
                })
            })
        }
    } else {
        sprites.destroy(sprite)
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += 0 - sprites.readDataNumber(sprite, "Damage")
    }
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value <= 0) {
        sprites.destroy(otherSprite)
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    if (_1Gamemode == 2) {
        RespawnText = textsprite.create("Respawning in 3", 15, 2)
        RespawnText.setFlag(SpriteFlag.RelativeToCamera, true)
        RespawnText.setPosition(80, 12)
        _3PlayerBody.setFlag(SpriteFlag.Invisible, true)
        _3PlayerWeapon.setFlag(SpriteFlag.Invisible, true)
        _3PlayerBody.setFlag(SpriteFlag.Ghost, true)
        _3PlayerWeapon.setFlag(SpriteFlag.Ghost, true)
        controller.moveSprite(_3PlayerBody, 0, 0)
        timer.after(1000, function () {
            RespawnText.setText("Respawning in 2")
            timer.after(1000, function () {
                RespawnText.setText("Respawning in 1")
                timer.after(1000, function () {
                    _3HealthBar.value = _3HealthBar.max
                    _3PlayerBody.setFlag(SpriteFlag.Invisible, false)
                    _3PlayerWeapon.setFlag(SpriteFlag.Invisible, false)
                    _3PlayerBody.setFlag(SpriteFlag.Ghost, false)
                    _3PlayerWeapon.setFlag(SpriteFlag.Ghost, false)
                    RespawnText.setText("Take care!")
                    RespawnText.setPosition(80, 12)
                    RespawnText.lifespan = 6000
                    easing.blockEaseBy(RespawnText, 0, -50, 4000, easing.Mode.InBack)
                    controller.moveSprite(_3PlayerBody, _2BaseSpeed, _2BaseSpeed)
                    tiles.placeOnRandomTile(_3PlayerBody, assets.tile`SiegeObeliskSpawn`)
                })
            })
        })
    } else {
        death()
    }
})
function Enemycatalog () {
    SelectionMenuGamemode.x += 200
    SelectionMenuGamemode.setButtonEventsEnabled(false)
    sprites.destroy(SelectionMenuText)
    SelectionMenuText = textsprite.create("Learn about the enemies.", 0, 5)
    SelectionMenuText.setPosition(80, 8)
    Enemycatalogmenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Dia", assets.image`myImage19`),
    miniMenu.createMenuItem("Kubo", assets.image`myImage20`),
    miniMenu.createMenuItem("Ragey", assets.image`myImage18`),
    miniMenu.createMenuItem("RedSprites", assets.image`EnemyCross`),
    miniMenu.createMenuItem("Poopy", assets.image`EnemyTri`),
    miniMenu.createMenuItem("Back")
    )
    Enemycatalogmenu.setFrame(img`
        5 2 2 2 2 2 2 2 2 2 2 2 2 2 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 f f f f f f f f f f f f f 9 
        5 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        `)
    Enemycatalogmenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 50)
    Enemycatalogmenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
    Enemycatalogmenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 2)
    Enemycatalogmenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 2)
    Enemycatalogmenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
    Enemycatalogmenu.setPosition(80, 50)
    game.setDialogFrame(img`
        b d d b d d d d d d d d d d b 
        b d d d b d d d d d d d d d b 
        b d d d d d d d d d d d d d b 
        b d d d d d d d d d d d d d b 
        5 d d d d d d d d d d d d d 5 
        b d d d d d d d d d d d d d b 
        5 d d d d d d d d d d d d d 5 
        b d d d d d d d d d d d d d b 
        b d d d d d d d d d d d d d b 
        b d d d d d d d d d d d d d b 
        d d d d d d d d d d d d d d d 
        b d d d d d d d d d d d d d b 
        5 d d d d d d d d d d d d d 5 
        b d d d d d d d d d d d d d b 
        b d d d d d d d d d d d d d b 
        `)
    Enemycatalogmenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selection == "Dia") {
            game.showLongText("Dia is the beautiful diamond sparkling in the arena. A little tougher than the others, the speed is remarkable and the strength is buffed! Good luck getting past her.", DialogLayout.Center)
        } else if (false) {
            game.splash("")
        } else if (selection == "Kubo") {
            game.showLongText("Kubo is the basic cube there is. Originally, it was another recently forgotten enemy called Silly Bird that took his place, but this is the canon enemy of all of Silly Brawl!", DialogLayout.Center)
        } else if (selection == "Ragey") {
            game.showLongText("The true arena king. This strong, tough, angry rectangle wants to crush you in this fierce battle of Silly Brawl. The hardest enemy of all, this angry shape has high hopes for crushing YOU! Good luck defeating him!", DialogLayout.Center)
        } else if (selection == "RedSprites") {
            game.showLongText("A swarm of RedSprites, coming in hot!", DialogLayout.Center)
            game.showLongText("These RedSprites sure are a pet peeve in this game. They come out everywhere, they have high speed-what else? ", DialogLayout.Center)
            game.showLongText("Inspired by a forum user, legend has it that RedSprites are a complication for the brain. That means they're a big brain teaser for the mind!", DialogLayout.Center)
            game.showLongText("(Wait, was that really from a legend?)", DialogLayout.Bottom)
        } else if (selection == "Back") {
            sprites.destroy(Enemycatalogmenu)
            SelectionMenuGamemode.x += -200
            SelectionMenuGamemode.setButtonEventsEnabled(true)
        } else if (selection == "Poopy") {
            game.showLongText("Let's be honest-this guy is REALLY poopy.", DialogLayout.Center)
            game.showLongText("Poopy just stays in one spot and just chills there, shooting projectiles at you. Yes, you can damage him, but can that really stop him anyways?", DialogLayout.Center)
        } else {
        	
        }
    })
}
browserEvents.MouseRight.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (_1GameStarted) {
        if (blockSettings.readString("SaveControls") == "PC") {
            SuperAtacj()
        }
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (_1Gamemode == 1) {
        if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
            DefaultWaveManager()
            _3HealthBar.value += 10
        }
    }
    if (_1Gamemode == 2) {
        if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
            SiegeWaveManager()
        }
    }
    if (_1Gamemode == 0 || _1Gamemode == 3) {
        _1Score += 1
        _3ScoreTracker.setText("S:" + _1Score)
        _3ScoreTracker.setPosition(151 - ((convertToText(_1Score).length - 1) * 5 - (convertToText(_1Score).length - 1) * 2), 116)
    }
})
function ShootBullet (Angle: number, Image2: Image, Shooter: Sprite, Lifespan: number, Sped: number, Damage: number, NumberOfBullets: number, BulletDelay: number) {
    timer.background(function () {
        music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 76, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    })
    timer.throttle("Shooting", 10, function () {
        for (let index = 0; index < NumberOfBullets; index++) {
            Bullet = sprites.create(Image2, SpriteKind.Projectile)
            Bullet.setStayInScreen(false)
            Bullet.z = -1
            if (Bullet.image.equals(assets.image`BodyWheely`)) {
                Bullet.setFlag(SpriteFlag.BounceOnWall, true)
            } else {
                Bullet.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
            spriteutils.placeAngleFrom(
            Bullet,
            Angle,
            -4,
            Shooter
            )
            spriteutils.setVelocityAtAngle(Bullet, Angle, Sped)
            Bullet.lifespan = Lifespan
            sprites.setDataNumber(Bullet, "Damage", Damage)
            Bullet.image.replace(1, 9)
            pause(BulletDelay)
        }
    })
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Obelisk, function (sprite, otherSprite) {
    spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, otherSprite), 0 - 250)
    timer.throttle("DamageObelisk", 100, function () {
        ObeliskHealthBar.value += 0 - sprites.readDataNumber(sprite, "Damage")
        scene.cameraShake(6, 400)
    })
})
statusbars.onDisplayUpdated(StatusBarKind.Ammo, function (status, image2) {
    image2.drawLine(9, 0, 9, 9, 12)
    image2.drawLine(20, 0, 20, 9, 12)
    image2.drawRect(0, 0, image.getDimension(image2, image.Dimension.Width), image.getDimension(image2, image.Dimension.Height), 1)
})
browserEvents.onMouseMove(function (x, y) {
    if (blockSettings.readString("SaveControls") == "PC") {
        if (_1GameStarted) {
            _3Cursor.setPosition(x + (scene.cameraProperty(CameraProperty.X) - scene.screenWidth() / 2), y + (scene.cameraProperty(CameraProperty.Y) - scene.screenHeight() / 2))
        }
    }
})
function Confirmation () {
    easing.blockEaseTo(SelectionMenuCombinationSprite, scene.screenWidth() / 2, scene.screenHeight() / 2, 500, easing.Mode.InCirc)
    SelectionMenuText.setText("Do you accept this form?")
    SelectionMenuText.setPosition(80, 8)
    SelectionMenuConfirmation = miniMenu.createMenu(
    miniMenu.createMenuItem("ACCEPT"),
    miniMenu.createMenuItem("DENY")
    )
    SelectionMenuConfirmation.setFrame(assets.image`MenuFrame`)
    SelectionMenuConfirmation.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 2)
    SelectionMenuConfirmation.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1)
    SelectionMenuConfirmation.setPosition(84, 100)
    SelectionMenuConfirmation.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            SelectionMenuText.setText("Then, let us begin!")
            SelectionMenuText.setPosition(80, 8)
            SelectionMenuConfirmation.close()
            easing.blockEaseTo(SelectionMenuCombinationSprite, scene.screenWidth() / 2, -20, 1000, easing.Mode.InBack)
            timer.after(500, function () {
                color.startFade(color.originalPalette, color.Black, 500)
                timer.after(500, function () {
                    sprites.destroy(SelectionMenuText)
                    sprites.destroy(SelectionMenuConfirmation)
                    sprites.destroy(SelectionMenuCombinationSprite)
                    StartGame()
                    color.startFade(color.Black, color.originalPalette, 250)
                })
            })
        } else {
            SelectionMenuText.setText("Then, let us start over.")
            SelectionMenuText.setPosition(80, 8)
            easing.blockEaseTo(SelectionMenuCombinationSprite, scene.screenWidth() / 2, scene.screenHeight() + 20, 1000, easing.Mode.InBack)
            SelectionMenuConfirmation.close()
            timer.after(500, function () {
                color.startFade(color.originalPalette, color.Black, 500)
                timer.after(500, function () {
                    sprites.destroy(SelectionMenuConfirmation)
                    sprites.destroy(SelectionMenuCombinationSprite)
                    sprites.destroy(SelectionMenuText)
                    BodySelect()
                    color.startFade(color.Black, color.originalPalette, 250)
                })
            })
        }
    })
}
function StartGame () {
    music.play(music.createSong(hex`00be000408020105001c000f0a006400f4010a0000040000000000000000000000000000000002600000000400012c04000800012a08000c0001290c001000012710001400012514001800012418001c0001221c002000012020002400011e24002800011d28002c00011b2c003000011930003400011834003800011638003c0001143c0040000112`), music.PlaybackMode.UntilDone)
    timer.background(function () {
        music.play(music.createSong(hex`00be000408040205001c000f0a006400f4010a0000040000000000000000000000000000000002660000000400010508000c00010510001400010518001c00010520002400010528002c00010530003400010538003c00010840004400010548004c00010550005400010558005c00010560006400010568006c00010570007400010578007c0001057c008000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800f700000001000400010206040005000106080009000500010206080c000d000106100011000400010206140015000106180019000500010206081c001d000106200021000400010206240025000106280029000500010206082c002d000106300031000400010206340035000106380039000500010206083c003d000106400041000400010206440045000106480049000500010206084c004d000106500051000400010206540055000106580059000500010206085c005d0001066000610004000102066400650001066800690004000102066c006d000106700071000400010206740075000106780079000500010206087c007d000106`), music.PlaybackMode.LoopingInBackground)
    })
    _2BaseHealth = BodyHealthArray[_1Body]
    _2BaseSpeed = BodySpeedArray[_1Body]
    _3PlayerBody = sprites.create(BodyImagesArray[_1Body], SpriteKind.Player)
    controller.moveSprite(_3PlayerBody, _2BaseSpeed, _2BaseSpeed)
    _3PlayerWeapon = sprites.create(BodyImagesArray[_1Weapon], SpriteKind.Weapon)
    _3PlayerWeapon.setFlag(SpriteFlag.GhostThroughWalls, true)
    if (_1Gamemode == 0) {
        tiles.setCurrentTilemap(tilemap`12x12`)
        scene.cameraFollowSprite(_3PlayerBody)
    } else if (_1Gamemode == 1) {
        tiles.setCurrentTilemap(tilemap`12x12`)
        scene.cameraFollowSprite(_3PlayerBody)
    } else if (_1Gamemode == 2) {
        tiles.setCurrentTilemap(tilemap`Siege`)
        scene.cameraFollowSprite(_3PlayerBody)
    } else if (_1Gamemode == 3) {
        tiles.setCurrentTilemap(tilemap`Legacy`)
    }
    scene.setBackgroundColor(15)
    Hud = sprites.create(assets.image`HUDbar`, SpriteKind.UI)
    Hud.setPosition(80, 116)
    Hud.z = 99
    Hud.setFlag(SpriteFlag.RelativeToCamera, true)
    for (let value of tiles.getTilesByType(assets.tile`WallTile`)) {
        tiles.setWallAt(value, true)
    }
    _3PlayerBody.setPosition(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.Columns) * 16 / 2, tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.Rows) * 16 / 2)
    tiles.placeOnRandomTile(_3PlayerBody, assets.tile`SiegeObeliskSpawn`)
    _3Cursor = sprites.create(assets.image`crosshair`, SpriteKind.UI)
    _3HealthBar = statusbars.create(60, 5, StatusBarKind.Health)
    _3HealthBar.setColor(9, 8)
    _3HealthBar.setBarBorder(1, 9)
    _3HealthBar.max = _2BaseHealth
    _3HealthBar.value = _2BaseHealth
    _3HealthBar.setPosition(80, 117)
    _3HealthBar.setFlag(SpriteFlag.RelativeToCamera, true)
    _3HealthBar.z = 100
    _3AmmoBar = statusbars.create(30, 5, StatusBarKind.Ammo)
    _3AmmoBar.setColor(1, 12)
    _3AmmoBar.setBarBorder(1, 1)
    _3AmmoBar.max = 300
    _3AmmoBar.value = 300
    _3AmmoBar.attachToSprite(_3Cursor, -23, 0)
    _3SuperBar = statusbars.create(30, 5, StatusBarKind.SuperAmmo)
    _3SuperBar.setColor(9, 8)
    _3SuperBar.setBarBorder(1, 9)
    _3SuperBar.max = 100
    _3SuperBar.value = 100
    _3SuperBar.attachToSprite(_3Cursor, -28, 0)
    IsPlayerImmune = false
    _1GameStarted = true
    _3ScoreTracker = textsprite.create("S:0", 0, 1)
    _3ScoreTracker.setFlag(SpriteFlag.RelativeToCamera, true)
    _3ScoreTracker.setPosition(151, 116)
    _1Score = 0
    _3ScoreTracker.z = 100
    if (_1Gamemode == 1 || _1Gamemode == 2) {
        _3ScoreTracker.setText("W:0")
    }
    if (_1Gamemode == 2) {
        _3Obelisk = sprites.create(assets.image`SiegeObelisk`, SpriteKind.Obelisk)
        ObeliskHealthBar = statusbars.create(50, 6, StatusBarKind.ObeliskHealth)
        ObeliskHealthBar.setColor(9, 8)
        ObeliskHealthBar.setBarBorder(1, 9)
        ObeliskHealthBar.attachToSprite(_3Obelisk)
        ObeliskHealthBar.max = 200
        ObeliskHealthBar.value = 200
        tiles.placeOnRandomTile(_3Obelisk, assets.tile`SiegeObeliskSpawn`)
        SiegeWaveManager()
    }
    if (_1Gamemode == 1) {
        DefaultWaveManager()
    }
}
function DefaultWaveManager () {
    _1Score += 1
    _3ScoreTracker.setText("W:" + _1Score)
    _3ScoreTracker.setPosition(151 - ((convertToText(_1Score).length - 1) * 5 - (convertToText(_1Score).length - 1) * 2), 116)
    WaveStartText = textsprite.create("WAVE " + _1Score, 15, 2)
    WaveStartText.setFlag(SpriteFlag.RelativeToCamera, true)
    WaveStartText.setPosition(80, 12)
    WaveStartText.lifespan = 5000
    timer.background(function () {
        pause(1000)
        easing.blockEaseBy(WaveStartText, 0, -100, 2000, easing.Mode.InBack)
        if (_1Score == 1) {
            StartWave(5, [0])
        } else if (_1Score == 2) {
            StartWave(7, [
            0,
            0,
            0,
            1
            ])
        } else if (_1Score == 3) {
            StartWave(3, [1, 2, 3])
        } else if (_1Score == 4) {
            StartWave(2, [2])
        } else if (_1Score == 5) {
            StartWave(6, [
            1,
            2,
            1,
            0,
            3
            ])
        } else if (_1Score == 6) {
            StartWave(4, [4, 3, 3])
        } else if (_1Score == 7) {
            StartWave(10, [
            0,
            0,
            0,
            1
            ])
        } else if (_1Score == 8) {
            StartWave(5, [
            0,
            1,
            2,
            3,
            4
            ])
        } else if (_1Score == 9) {
            StartWave(5, [3])
        } else if (_1Score == 10) {
            StartWave(15, [
            0,
            0,
            0,
            0,
            1,
            1,
            2,
            3
            ])
        } else if (_1Score == 11) {
            StartWave(2, [3])
            StartWave(8, [4])
        } else if (_1Score == 12) {
            StartWave(14, [4])
            StartWave(1, [0])
        } else if (_1Score == 13) {
            StartWave(7, [
            3,
            3,
            2,
            1
            ])
        } else if (_1Score == 14) {
            StartWave(8, [3, 1])
        } else if (_1Score == 15) {
            StartWave(4, [2])
        } else {
            StartWave(randint(4, 8) + Math.floor(_1Score / 10), [
            randint(0, 4),
            randint(1, 4),
            randint(1, 2),
            randint(2, 3)
            ])
        }
    })
}
sprites.onOverlap(SpriteKind.DrillSuper, SpriteKind.Enemy, function (sprite, otherSprite) {
    spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite), 310)
})
function RegularAttacj () {
    if (_3AmmoBar.value >= 100) {
        _3AmmoBar.value += -100
        if (_1Weapon == 0) {
            ShootBullet(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`BodyWheely`, _3PlayerWeapon, 1750, 150, 125, 1, 0)
        } else if (_1Weapon == 1) {
            ShootBullet(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`BodyBoxer0`, _3PlayerWeapon, 200, 250, 200, 1, 0)
        } else if (_1Weapon == 2) {
            ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileStar`, _3PlayerWeapon, 650, 300, 25, 3, 0.4, 2, 100)
        } else if (_1Weapon == 3) {
            ShootBullet(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`DrillProjectile`, _3PlayerWeapon, 150, 0, 100, 1, 0)
        } else if (_1Weapon == 4) {
            ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileBee`, _3PlayerWeapon, 750, 110, 25, 5, 0.2, 1, 0)
        } else if (_1Weapon == 5) {
            ShootBullet(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`RhombusProjectile`, _3PlayerWeapon, 800, 170, 20, 10, 25)
        } else if (_1Weapon == 6) {
            ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileFeesh`, _3PlayerWeapon, 1000, 130, 45, 3, 0.2, 1, 0)
        } else if (_1Weapon == 7) {
            ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileFlame`, _3PlayerWeapon, 500, 150, 10, 3, 0.2, 4, 30)
        } else if (_1Weapon == 8) {
            ShootBullet(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileArrow`, _3PlayerWeapon, 1500, 170, 125, 1, 0)
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.image.equals(assets.image`DrillProjectile`)) {
        if (!(sprites.readDataBoolean(otherSprite, "HitRecently"))) {
            sprites.setDataBoolean(otherSprite, "HitRecently", true)
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += 0 - sprites.readDataNumber(sprite, "Damage")
            timer.background(function () {
                timer.after(150, function () {
                    sprites.setDataBoolean(otherSprite, "HitRecently", false)
                })
            })
        }
    } else {
        sprites.destroy(sprite)
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += 0 - sprites.readDataNumber(sprite, "Damage")
    }
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value <= 0) {
        sprites.destroy(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (!(IsPlayerImmune)) {
        if (_1Gamemode == 3) {
            _3HealthBar.value += 0 - 0.4
        } else {
            spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, otherSprite), 0 - 150)
            timer.throttle("damage", 200, function () {
                _3HealthBar.value += 0 - sprites.readDataNumber(sprite, "Damage")
                scene.cameraShake(2, 200)
            })
        }
    }
})
function ShootBulletWallPattern (Angle: number, Image2: Image, Shooter: Sprite, Lifespan: number, Sped: number, Damage: number, NumberOfBullets: number, BulletSpacing: number, Repetitions: number, RepetitionDelay: number) {
    for (let index = 0; index < Repetitions; index++) {
        if (NumberOfBullets % 2 == 1) {
            AngleIncrement = 0 - BulletSpacing * Math.floor(NumberOfBullets / 2)
        } else {
            AngleIncrement = 0 - BulletSpacing * Math.floor(NumberOfBullets / 2)
            AngleIncrement += BulletSpacing / 2
        }
        for (let index = 0; index < NumberOfBullets; index++) {
            Bullet = sprites.create(Image2, SpriteKind.Projectile)
            Bullet.setStayInScreen(false)
            Bullet.z = -1
            if (Bullet.image.equals(assets.image`BodyWheely`)) {
                Bullet.setFlag(SpriteFlag.BounceOnWall, true)
            } else {
                Bullet.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
            TempImage = Bullet.image.clone()
            TempImage.replace(1, 9)
            Bullet.setImage(TempImage)
            spriteutils.placeAngleFrom(
            Bullet,
            Angle + AngleIncrement,
            -4,
            Shooter
            )
            spriteutils.setVelocityAtAngle(Bullet, Angle + AngleIncrement, Sped)
            Bullet.lifespan = Lifespan
            sprites.setDataNumber(Bullet, "Damage", Damage)
            AngleIncrement += BulletSpacing
        }
        pause(RepetitionDelay)
    }
}
function SuperAtacj () {
    timer.background(function () {
        music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    })
    if (_3SuperBar.value >= 99.5) {
        timer.background(function () {
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        })
        _3SuperBar.value = 0
        if (_1Body == 0) {
            ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`BodyWheely`, _3PlayerBody, 2500, 100, 50, 12, 100, 1, 0)
        } else if (_1Body == 1) {
            _3PlayerBody.startEffect(effects.hearts, 500)
            for (let index = 0; index < 5; index++) {
                _3HealthBar.value += 8 - Math.min(_1HealingDecay, 7)
                pause(5)
            }
            _1HealingDecay += 1.5
        } else if (_1Body == 2) {
            ShootBulletWallPattern(spriteutils.degreesToRadians(45), assets.image`BodyStar`, _3PlayerBody, 1000, 200, 100, 4, 33, 1, 0)
        } else if (_1Body == 3) {
            Bullet = sprites.create(assets.image`DrillSuper`, SpriteKind.DrillSuper)
            Bullet.z = -1
            spriteutils.placeAngleFrom(
            Bullet,
            0,
            0,
            _3PlayerBody
            )
            Bullet.lifespan = 150
        } else if (_1Body == 4) {
            ShootBullet(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileBee`, _3PlayerBody, 3500, 110, 150, 1, 0)
            Bullet.image.replace(9, 7)
            Bullet.setKind(SpriteKind.HealBullet)
        } else if (_1Body == 5) {
            IsPlayerImmune = true
            controller.moveSprite(_3PlayerBody, 0, 0)
            spriteutils.setVelocityAtAngle(_3PlayerBody, spriteutils.angleFrom(_3PlayerBody, _3Cursor), 350)
            timer.after(200, function () {
                IsPlayerImmune = false
                spriteutils.setVelocityAtAngle(_3PlayerBody, 0, 0)
                controller.moveSprite(_3PlayerBody, _2BaseSpeed, _2BaseSpeed)
            })
        } else if (_1Body == 6) {
            timer.throttle("FisjDive", 3000, function () {
                IsPlayerImmune = true
                _3PlayerBody.setImage(assets.image`FeeshDive`)
                controller.moveSprite(_3PlayerBody, _2BaseSpeed + 50, _2BaseSpeed + 50)
                timer.after(3000, function () {
                    IsPlayerImmune = false
                    _3PlayerBody.setImage(BodyImagesArray[_1Body])
                    controller.moveSprite(_3PlayerBody, _2BaseSpeed, _2BaseSpeed)
                })
            })
        } else if (_1Body == 7) {
            ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileFlame`, _3PlayerBody, 750, 60, 10, 24, 500, 7, 250)
        } else if (_1Body == 8) {
            controller.moveSprite(_3PlayerBody, 0, 0)
            if (!(tiles.tileAtLocationIsWall(_3Cursor.tilemapLocation()))) {
                _3PlayerBody.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
            spriteutils.moveTo(_3PlayerBody, spriteutils.pos(_3Cursor.x, _3Cursor.y), 350)
            timer.after(350, function () {
                _3PlayerBody.setFlag(SpriteFlag.GhostThroughWalls, false)
                controller.moveSprite(_3PlayerBody, _2BaseSpeed, _2BaseSpeed)
                ShootBulletWallPattern(spriteutils.angleFrom(_3PlayerBody, _3Cursor), assets.image`ProjectileArrow`, _3PlayerBody, 1400, 120, 50, 6, 200, 1, 0)
            })
        }
    }
}
function StartWave (EnemyCount: number, EnemyArray: number[]) {
    timer.background(function () {
        music.play(music.createSong(hex`00b4000408040205001c000f0a006400f4010a0000040000000000000000000000000000000002600000000400010508000c00010510001400010518001c00010520002400010528002c00010530003400010538003c00010840004400010548004c00010550005400010558005c00010560006400010568006c00010570007400010578007c00010509010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800f800000001000400010206040005000106080009000500010206080c000d000106100011000400010206140015000106180019000500010206081c001d000106200021000400010206240025000106280029000500010206082c002d000106300031000400010206340035000106380039000500010206083c003d000106400041000400010206440045000106480049000500010206084c004d000106500051000400010206540055000106580059000500010206085c005d000106600061000400010206640065000106680069000500010206086c006d000106700071000400010206740075000106780079000500010206087c007d000106`), music.PlaybackMode.UntilDone)
    })
    for (let index = 0; index < EnemyCount; index++) {
        EnemyFactory(EnemyArray._pickRandom())
    }
}
scene.addSystemMenuEntry_block(img`
    . . . b b b b b b b b b . . . . 
    . . b 1 d d d d d d d 1 b . . . 
    . b 1 1 1 1 1 1 1 1 1 1 1 b . . 
    . b d b c c c c c c c b d b . . 
    . b d c 9 9 9 9 9 9 9 c d b . . 
    . b d c 9 d 9 9 9 9 9 c d b . . 
    . b d c 9 9 9 9 9 9 9 c d b . . 
    . b d c 9 9 9 9 9 9 9 c d b . . 
    . b d c 9 9 9 9 9 9 9 c d b . . 
    . b d c c c c c c c c c d b . . 
    . c b b b b b b b b b b b c . . 
    c b c c c c c c c c c c c b c . 
    c 1 d d d d d d d d d d d 1 c . 
    c 1 d 1 1 d 1 1 d 1 1 d 1 1 c . 
    c b b b b b b b b b b b b b c . 
    c c c c c c c c c c c c c c c . 
    `, "SWITCH CONTROLS", function () {
    if (blockSettings.exists("SaveControls")) {
        if (blockSettings.readString("SaveControls") == "PC") {
            blockSettings.writeString("SaveControls", "Mobile")
        } else {
            blockSettings.writeString("SaveControls", "PC")
        }
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    }
})
statusbars.onZero(StatusBarKind.ObeliskHealth, function (status) {
    death()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`WallTile`, function (sprite, location) {
    if (!(sprites.hasFlag(_3PlayerBody, SpriteFlag.GhostThroughWalls))) {
        if (!(tiles.tileAtLocationIsWall(_3PlayerBody.tilemapLocation()))) {
            tiles.placeOnTile(_3PlayerBody, _3PlayerBody.tilemapLocation())
        } else if (!(tiles.tileAtLocationIsWall(_3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Top)))) {
            tiles.placeOnTile(_3PlayerBody, _3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
        } else if (!(tiles.tileAtLocationIsWall(_3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)))) {
            tiles.placeOnTile(_3PlayerBody, _3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
        } else if (!(tiles.tileAtLocationIsWall(_3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)))) {
            tiles.placeOnTile(_3PlayerBody, _3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
        } else if (!(tiles.tileAtLocationIsWall(_3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)))) {
            tiles.placeOnTile(_3PlayerBody, _3PlayerBody.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
        }
    }
})
let _1HealingDecay = 0
let TempImage: Image = null
let AngleIncrement = 0
let _3SuperBar: StatusBarSprite = null
let _3AmmoBar: StatusBarSprite = null
let Hud: Sprite = null
let _2BaseHealth = 0
let SelectionMenuConfirmation: miniMenu.MenuSprite = null
let _3Cursor: Sprite = null
let ObeliskHealthBar: StatusBarSprite = null
let Bullet: Sprite = null
let Enemycatalogmenu: miniMenu.MenuSprite = null
let _2BaseSpeed = 0
let _3PlayerWeapon: Sprite = null
let RespawnText: TextSprite = null
let SelectionMenuGamemode: miniMenu.MenuSprite = null
let _3HealthBar: StatusBarSprite = null
let IsPlayerImmune = false
let GameOverMenu: miniMenu.MenuSprite = null
let WaveStartText: TextSprite = null
let _3ScoreTracker: TextSprite = null
let _1Score = 0
let _3EnemyHealthBar: StatusBarSprite = null
let _3Obelisk: Sprite = null
let _1Gamemode = 0
let _3PlayerBody: Sprite = null
let _3Enemy: Sprite = null
let _1Weapon = 0
let SelectionMenuWeapons: miniMenu.MenuSprite = null
let WeaponDescriptionsArray: string[] = []
let SelectionMenuText: TextSprite = null
let SelectionMenuCombinationSprite: Sprite = null
let _1Body = 0
let SelectionMenuBodies: miniMenu.MenuSprite = null
let TempNumber = 0
let SelectionMenuBodiesArray: miniMenu.MenuItem[] = []
let BodyDescriptionsArray: string[] = []
let BodyNamesArray: string[] = []
let BodySpeedArray: number[] = []
let BodyHealthArray: number[] = []
let BodyImagesArray: Image[] = []
let _1GameStarted = false
if (false) {
    blockSettings.clear()
}
scene.setBackgroundColor(15)
game.setDialogFrame(assets.image`MenuFrame`)
game.setDialogTextColor(9)
_1GameStarted = false
let Title = sprites.create(assets.image`myImage17`, SpriteKind.UI)
Title.z = 999
effects.blizzard.startScreenEffect()
pauseUntil(() => controller.A.isPressed() && !(scene.isSystemMenuOpen_block()))
effects.blizzard.endScreenEffect()
color.startFade(color.originalPalette, color.Black, 250)
pause(250)
sprites.destroy(Title)
BodyImagesArray = []
BodyHealthArray = []
BodySpeedArray = []
BodyNamesArray = []
BodyDescriptionsArray = []
// Ammo Reload -
// How much ammo should reload per second (100 = 1 ammo)
let AmmoReloadArray = [
150,
200,
150,
100,
150,
130,
180,
100,
150
]
// Super Reload -
// How many seconds it takes to reload (basically just a cooldown now
let SuperReloadArray = [
10,
20,
5,
7,
20,
5,
15,
25,
20
]
DefineShape(assets.image`myImage12`, 70, 120, "Dash", "SUPER: Shoot circles in all directions around you.", "Shoot a circle that bounces on walls.")
DefineShape(assets.image`myImage5`, 130, 85, "Basic Box", "SUPER: Heal some HP. Healing ammount lowers with each use.", "Shoot a close-ranged box. High damage.")
DefineShape(assets.image`myImage14`, 100, 100, "Dlitch", "SUPER: Shoot 4 high-damage stars around you.", "Shoot multiple stars in a spread pattern.")
DefineShape(assets.image`myImage6`, 110, 90, "CubeChick", "SUPER: Slam the ground, pushing enemies away.", "Slam the ground, damaging ALL enemies nearby. Long reload.")
DefineShape(assets.image`myImage9`, 90, 90, "Cubo", "SUPER: Shoot a bee that heals you on hit.", "Shoot many bees in front of you.")
DefineShape(assets.image`myImage7`, 70, 110, "Void", "SUPER: Dash through enemies with invincibility.", "Shoot a segmented beam with high damage. May require aiming.")
DefineShape(assets.image`myImage8`, 110, 95, "Feesh", "SUPER: Dive underwater to become invincible and faster briefly.", "Shoot bubbles ahead of you.")
DefineShape(assets.image`BodyFlame`, 75, 115, "Kirbo", "SUPER: Shoot waves of fire around you. Looong cooldown.", "Shoot a stream of fire ahead.")
DefineShape(assets.image`BodyArrow`, 95, 105, "A stealthy stealer", "SUPER: Dash to your cursor, then shoot arrows around.", "Shoot a fast arrow. Can hit from far away.")
pause(5)
if (blockSettings.exists("SaveControls")) {
    GamemodeSelect()
    color.startFade(color.Black, color.originalPalette, 250)
} else {
    color.startFade(color.Black, color.originalPalette, 0)
    sprites.destroy(Title)
    pause(20)
    if (game.ask("Use PC controls?", "Change via menu.")) {
        blockSettings.writeString("SaveControls", "PC")
    } else {
        blockSettings.writeString("SaveControls", "Mobile")
    }
    color.startFade(color.originalPalette, color.Black, 250)
    pause(250)
    GamemodeSelect()
    color.startFade(color.Black, color.originalPalette, 250)
}
game.onUpdateInterval(100, function () {
    if (_1GameStarted) {
        _3AmmoBar.value += AmmoReloadArray[_1Weapon] / 10
        _3SuperBar.value += 100 / (SuperReloadArray[_1Body] * 10)
    }
})
game.onUpdateInterval(1500, function () {
    if (_1GameStarted) {
        if (_1Gamemode == 0) {
            if (Math.percentChance(40)) {
                EnemyFactory(0)
            } else {
                EnemyFactory([
                0,
                1,
                2,
                3,
                4
                ]._pickRandom())
            }
        }
    }
})
game.onUpdateInterval(250, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value, "EnemyID") == 4) {
            for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
                if (spriteutils.distanceBetween(value, value2) <= 45) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, value2).value += 10
                    value2.startEffect(effects.hearts, 100)
                }
            }
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (_1GameStarted) {
        if (_1Gamemode == 3) {
            if (Math.percentChance(60)) {
                EnemyFactory(0)
            } else {
                EnemyFactory([
                0,
                1,
                2,
                3
                ]._pickRandom())
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "EnemyID") == 2) {
                Bullet = sprites.create(assets.image`TriBullet`, SpriteKind.EnemyBullet)
                Bullet.setStayInScreen(false)
                Bullet.z = -1
                Bullet.setFlag(SpriteFlag.GhostThroughWalls, true)
                spriteutils.placeAngleFrom(
                Bullet,
                0,
                0,
                value
                )
                spriteutils.setVelocityAtAngle(Bullet, spriteutils.angleFrom(value, _3PlayerBody), 65)
                Bullet.lifespan = 3000
                sprites.setDataNumber(Bullet, "Damage", 15)
            }
        }
    }
})
game.onUpdate(function () {
    if (_1GameStarted) {
        spriteutils.placeAngleFrom(
        _3PlayerWeapon,
        spriteutils.angleFrom(_3PlayerBody, _3Cursor),
        20,
        _3PlayerBody
        )
        if (blockSettings.readString("SaveControls") == "Mobile") {
            if (controller.up.isPressed()) {
                _3Cursor.setPosition(_3PlayerBody.x, _3PlayerBody.y - 45)
            } else if (controller.down.isPressed()) {
                _3Cursor.setPosition(_3PlayerBody.x, _3PlayerBody.y + 45)
            } else if (controller.left.isPressed()) {
                _3Cursor.setPosition(_3PlayerBody.x - 45, _3PlayerBody.y)
            } else if (controller.right.isPressed()) {
                _3Cursor.setPosition(_3PlayerBody.x + 45, _3PlayerBody.y)
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            if (tiles.tileAtLocationIsWall(value.tilemapLocation())) {
                sprites.destroy(value)
            }
        }
    }
})
