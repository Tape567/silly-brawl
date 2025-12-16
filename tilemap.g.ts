// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "12x12":
            case "level1":return tiles.createTilemap(hex`0c000d00010b0c0d0e0f1011121314011615171919191919191919000018030808080808080518000018071a1a1a1a1a1a0918000118071b1d1e1f201c0918010018071b1f2224201c0918000018071b1f1f24211c0918000118071b231e1e211c0918010018071a1a1a1a1a1a0918000018040a0a0a0a0a0a061800001818181818181818181800011818180118180118181801020202020202020202020202`, img`
2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11,sprites.builtin.crowd0,sprites.builtin.crowd1,sprites.builtin.crowd2,sprites.builtin.crowd3,sprites.builtin.crowd4,sprites.builtin.crowd5,sprites.builtin.crowd6,sprites.builtin.crowd7,sprites.builtin.crowd8,sprites.builtin.crowd9,sprites.vehicle.roadIntersection1,sprites.dungeon.hazardSpike,sprites.vehicle.roadTurn2,sprites.dungeon.hazardLava1,sprites.dungeon.hazardHole,sprites.dungeon.greenOuterNorth2,sprites.dungeon.greenOuterWest2,sprites.dungeon.greenOuterEast2,sprites.dungeon.floorDark2,sprites.dungeon.floorDark4,sprites.dungeon.floorMixed,sprites.dungeon.floorDark1,sprites.dungeon.floorDark0,sprites.dungeon.floorLight3,sprites.dungeon.floorLightMoss,sprites.dungeon.floorDarkDiamond], TileScale.Sixteen);
            case "Siege":
            case "Siege1":return tiles.createTilemap(hex`19000b000c0d0e0f1011121314150c0d0e0f1011121314150c0d0e0f1019191d1a1e1919190303191919191903031919191919191919191c1a1919191919190805050505050a0319191919191919191a1b08050505050505041616161616060505050505050a1919011904161616161616041616161616061616161616160619010119041616161616160416160216160616161616161606190101190416161616161604161616161606161616161616061901191909070707070707041616161616060707070707070b19191818181818181818030907070707070b0318181818181818181919191919191919030318181818180303191919191919191919191919191919191919191919191919191919191919191919`, img`
. . . . . . . . . . . . . . . . . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,sprites.builtin.crowd0,sprites.builtin.crowd1,sprites.builtin.crowd2,sprites.builtin.crowd3,sprites.builtin.crowd4,sprites.builtin.crowd5,sprites.builtin.crowd6,sprites.builtin.crowd7,sprites.builtin.crowd8,sprites.builtin.crowd9,sprites.builtin.brick,myTiles.tile12,sprites.dungeon.hazardHole,myTiles.tile13,sprites.vehicle.roadIntersection1,sprites.vehicle.roadTurn4,sprites.vehicle.roadIntersection3,sprites.vehicle.roadIntersection2,sprites.dungeon.hazardSpike], TileScale.Sixteen);
            case "Legacy":
            case "Legacy1":return tiles.createTilemap(hex`0a0008000108070714140707060104090505050505051003040a050505050505100301120505050505051101030a0505050505051003040a0505050505050f03010b0c0d13130d0d0e0102020202020202020202`, img`
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile3,sprites.dungeon.hazardLava0,sprites.dungeon.hazardLava1,sprites.builtin.brick,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterNorth1,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterWest1,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouth0,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterEast1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterEast2,sprites.dungeon.greenOuterWest2,sprites.dungeon.greenOuterSouth2,sprites.dungeon.greenOuterNorth2], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "EnemySpawn":
            case "tile1":return tile1;
            case "SiegeObeliskSpawn":
            case "tile2":return tile2;
            case "WallTile":
            case "tile3":return tile3;
            case "CornerLine":
            case "tile4":return tile4;
            case "CornerLine0":
            case "tile5":return tile5;
            case "CornerLine1":
            case "tile6":return tile6;
            case "CornerLine2":
            case "tile7":return tile7;
            case "Line":
            case "tile8":return tile8;
            case "Line0":
            case "tile9":return tile9;
            case "Line1":
            case "tile10":return tile10;
            case "Line2":
            case "tile11":return tile11;
            case "myTile":
            case "tile12":return tile12;
            case "myTile0":
            case "tile13":return tile13;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
