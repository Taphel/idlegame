class Enum {
    constructor() {
        throw new Error(`${this.constructor.name} is a static Enum class, it is not meant to be instantiated.`);
    }
}

export class TileType extends Enum {
    static floor = "TILETYPE_FLOOR";
    static wall = "TILETYPE_WALL";
    static door = "TILETYPE_DOOR";
}

export class RoomType extends Enum {
    static combat = "ROOMTYPE_COMBAT";
    static elite = "ROOMTYPE_ELITE";
    static altar = "ROOMTYPE_ALTAR";
    static treasure = "ROOMTYPE_TREASURE";
    static shop = "ROOMTYPE_SHOP";
    static boss = "ROOMTYPE_BOSS";
    static event = "ROOMTYPE.EVENT";
    static empty = "ROOMTYPE_EMPTY";
}

export class AbilityTarget {
    // faction target
    static ally = "TARGETFACTION_ALLY";
    static enemy = "TARGETFACTION_ENEMY";
    static any = "TARGETFACTION_ANY";
    // target scope
    static self = "TARGETSCOPE_SELF";
    static first = "TARGETSCOPE_FIRST";
    static last = "TARGETSCOPE_LAST";
    static ahead = "TARGETSCOPE_AHEAD";
    static behind = "TARGETSCOPE_BEHIND";
    static highestHp = "TARGETSCOPE_HIGHHP";
    static lowestHp = "TARGETSCOPE_LOWHP";
    static highestAtk = "TARGETSCOPE_HIGHATK";
    static lowestAtk = "TARGETSCOPE_LOWATK";
    static random = "TARGETSCOPE_RANDOM";
    static all = "TARGETSCOPE_ALL";
}

export class AbilityCost extends Enum {
    static mana = "ABILITYCOST_MANA";
    static soul = "ABILITYCOST_SOUL";
    static blood = "ABILITYCOST_BLOOD";
    static rage = "ABILITYCOST_RAGE";
    static death = "ABILITYCOST_DEATH";
}

export class AbilityEffect extends Enum {
    static attackBonus = "ABILITYEFFECT_ATTACKBONUS";
    static hpBonus = "ABILITYEFFECT_HPBONUS";
}

export class UnitFaction extends Enum {
    static player = "FACTION_PLAYER";
    static enemy = "FACTION_ENEMY";
}

export class GameState extends Enum {
    static mapStart = "GAMESTATE_MAPSTART";
    static map = "GAMESTATE_MAP";
    static roomStart = "GAMESTATE_ROOMSTART";
    static idle = "GAMESTATE_IDLE";

}