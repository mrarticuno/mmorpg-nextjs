/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shields = [
  { name: 'Skjoldbrjotir', type: 'Shield', description: 'Shield Breaker', level: 2, DPS: 0, defense: 5, health: 20, RNG: 0 },
  { name: 'Vargförsvarare', type: 'Shield', description: 'Wolf Defender', level: 4, DPS: 0, defense: 10, health: 40, RNG: 0 },
  { name: 'Isbjörnsvakt', type: 'Shield', description: 'Ice Bear Guard', level: 8, DPS: 0, defense: 15, health: 60, RNG: 0 },
  { name: 'Havstormvärn', type: 'Shield', description: 'Sea Storm Shield', level: 16, DPS: 0, defense: 20, health: 80, RNG: 0 },
  { name: 'Fjällfäste', type: 'Shield', description: 'Mountain Bastion', level: 32, DPS: 0, defense: 25, health: 100, RNG: 0 },
];

const claws = [
  { name: 'Vargklor', type: 'Claw', description: 'Wolf Claws', level: 5, DPS: 20, defense: 8, health: 0, RNG: 0 },
  { name: 'Frostgrepp', type: 'Claw', description: 'Frost Grip', level: 10, DPS: 40, defense: 16, health: 0, RNG: 0 },
  { name: 'Blodörn', type: 'Claw', description: 'Blood Eagle', level: 20, DPS: 80, defense: 32, health: 0, RNG: 0 },
  { name: 'Svärdklo', type: 'Claw', description: 'Sword Claw', level: 40, DPS: 160, defense: 64, health: 0, RNG: 0 },
  { name: 'Nattens Skugga', type: 'Claw', description: 'Shadow of the Night', level: 80, DPS: 320, defense: 128, health: 0, RNG: 0 },
];

const spears = [
  { name: 'Åskaspett', type: 'Spear', description: 'Thunder Spear', level: 4, DPS: 23, defense: 0, health: 5, RNG: 0 },
  { name: 'Vargspjut', type: 'Spear', description: 'Wolf Spear', level: 8, DPS: 46, defense: 0, health: 10, RNG: 0 },
  { name: 'Isfjällslans', type: 'Spear', description: 'Ice Mountain Lance', level: 16, DPS: 92, defense: 0, health: 20, RNG: 0 },
  { name: 'Stjärnfallspik', type: 'Spear', description: 'Starfall Pike', level: 32, DPS: 184, defense: 0, health: 40, RNG: 0 },
  { name: 'Havssångare', type: 'Spear', description: 'Sea Singer', level: 64, DPS: 368, defense: 0, health: 80, RNG: 0 },
];

const bows = [
  { name: 'Skogsvandrare', type: 'Bow', description: 'Forest Wanderer', level: 1, DPS: 20.77 },
  { name: 'Vindpilbåge', type: 'Bow', description: 'Wind Arrow Bow', level: 24, DPS: 107.51 },
  { name: 'Frostbåge', type: 'Bow', description: 'Frost Bow', level: 48, DPS: 289.43 },
  { name: 'Ljusets Stråle', type: 'Bow', description: 'Ray of Light', level: 72, DPS: 367.28 },
  { name: 'Havets Öga', type: 'Bow', description: 'Eye of the Sea', level: 96, DPS: 458.71 }
];

const swords = [
  { name: 'Frostbit', type: 'Sword', description: 'Frost Bite', level: 1, DPS: 41.34 },
  { name: 'Vargtand', type: 'Sword', description: 'Wolf Tooth', level: 24, DPS: 165.34 },
  { name: 'Blodvåg', type: 'Sword', description: 'Blood Wave', level: 48, DPS: 298.96 },
  { name: 'Stålstorm', type: 'Sword', description: 'Steel Storm', level: 72, DPS: 407.12 },
  { name: 'Midnattssvärd', type: 'Sword', description: 'Midnight Sword', level: 96, DPS: 543.38 }
];

const staffs = [
  { name: 'Stjärntämjare', type: 'Staff', description: 'Star Tamer', level: 1, DPS: 49.19 },
  { name: 'Isflammaspira', type: 'Staff', description: 'Ice Flame Staff', level: 24, DPS: 187.11 },
  { name: 'Drömvävare', type: 'Staff', description: 'Dream Weaver', level: 48, DPS: 358.27 },
  { name: 'Åskhärskarespira', type: 'Staff', description: 'Thunder Harvester Staff', level: 72, DPS: 496.67 },
  { name: 'Vishetens Vaktare', type: 'Staff', description: 'Guardian of Wisdom', level: 96, DPS: 672.94 }
];

const wands = [
  { name: 'Frostgnista', type: 'Wand', description: 'Frost Spark', level: 1, DPS: 16.23 },
  { name: 'Stjärnljusvand', type: 'Wand', description: 'Starlight Wand', level: 24, DPS: 61.75 },
  { name: 'Vågskimmer', type: 'Wand', description: 'Wave Shimmer', level: 48, DPS: 118.23 },
  { name: 'Eldskugga', type: 'Wand', description: 'Fire Shadow', level: 72, DPS: 163.9 },
  { name: 'Nattbris', type: 'Wand', description: 'Night Breeze', level: 96, DPS: 222.07 }
];

async function upsertItems(items) {
  for (const item of items) {
    await prisma.item.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        type: item.type,
        description: item.description,
        level: item.level,
        DPS: item.DPS,
        defense: item.defense,
        health: item.health,
        RNG: item.RNG,
      }
    });
  }
}

async function upsertAllItems() {
  await upsertItems(shields);
  await upsertItems(claws);
  await upsertItems(spears);
  await upsertItems(bows);
  await upsertItems(swords);
  await upsertItems(staffs);
  await upsertItems(wands);
}


async function main() {
  try {
    // Classes
    await prisma.class.upsert({
      where: { name: 'Druid' },
      update: {},
      create: {
        name: 'Druid',
        image: '/druid.png',
        emoji: '🐻',
        description: "Druid is a mystical character deeply connected to nature. They possess the extraordinary ability to manipulate the forces of the earth, air, fire, and water. Druids are often seen as guardians of the wilderness, with the power to shape-shift into various animal forms, heal their allies, and unleash the fury of nature upon their foes. Whether it's summoning a thunderstorm to rain down lightning bolts or transforming into a fierce bear to protect their comrades, Druids are the embodiment of balance and harmony between the elements and the wild",
      }
    });
    await prisma.class.upsert({
      where: { name: 'Rouge' },
      update: {},
      create: {
        name: 'Rouge',
        image: '/rouge.png',
        emoji: '🏹',
        description: "Rogues are the masters of speed, stealth, and precision. They're incredibly difficult to hit due to their ability to dodge incoming attacks, and they also have the ability to stun their enemies, leaving them open to devastating attacks. Rogues are also able to pick locks, allowing them to open locked doors and chests that are inaccessible to other classes.",
      }
    });
    await prisma.class.upsert({
      where: { name: 'Mage' },
      update: {},
      create: {
        name: 'Mage',
        image: '/mage.png',
        emoji: '🔥',
        description: "Mages are the masters of magic, able to harness the forces of fire, frost, and arcane to destroy their enemies. They're also able to conjure food and water, allowing them to keep their allies fed and hydrated, as well as teleport to major cities and conjure portals to help their allies travel quickly across the world.",
      }
    });
    await prisma.class.upsert({
      where: { name: 'Warrior' },
      update: {},
      create: {
        name: 'Warrior',
        image: '/warrior.png',
        emoji: '🛡️',
        description: "Warriors are the masters of armed combat and are highly trained in the art of weaponry. They're able to use a variety of weapons, including swords, axes, maces, and polearms. Warriors are also able to wear heavy armor, making them extremely durable and difficult to kill.",
      }
    });

    // Skills Rogue
    // Skill 1: Backstab
    await prisma.skill.upsert({
      where: { name: 'Backstab' },
      update: {},
      create: {
        name: 'Backstab',
        description: "Deals damage to an enemy and increases the rogue's chance to dodge the next attack.",
        emoji: '🔪',
        type: 'Attack',
        manaCost: 20,
        level: 1,
        DPS: 50,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 2: Shadow Strike
    await prisma.skill.upsert({
      where: { name: 'Shadow Strike' },
      update: {},
      create: {
        name: 'Shadow Strike',
        description: "Disappears into the shadows and strikes a target with enhanced damage.",
        emoji: '🌑⚔️',
        type: 'Attack',
        manaCost: 30,
        level: 5,
        DPS: 80,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 3: Stealth
    await prisma.skill.upsert({
      where: { name: 'Stealth' },
      update: {},
      create: {
        name: 'Stealth',
        description: "Becomes nearly invisible, making the rogue harder to detect by enemies.",
        emoji: '🕵️‍♂️',
        type: 'Utility',
        manaCost: 15,
        level: 2,
        DPS: 0,
        defense: 10,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 4: Poisoned Blade
    await prisma.skill.upsert({
      where: { name: 'Poisoned Blade' },
      update: {},
      create: {
        name: 'Poisoned Blade',
        description: "Coats the rogue's weapon with a deadly poison, causing damage over time to the target.",
        emoji: '☠️⚔️',
        type: 'Attack',
        manaCost: 25,
        level: 3,
        DPS: 40,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 5: Evasion
    await prisma.skill.upsert({
      where: { name: 'Evasion' },
      update: {},
      create: {
        name: 'Evasion',
        description: "Swiftly dodges incoming attacks, reducing damage taken for a short duration.",
        emoji: '🔃',
        type: 'Defense',
        manaCost: 20,
        level: 4,
        DPS: 0,
        defense: 50,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 6: Smoke Bomb
    await prisma.skill.upsert({
      where: { name: 'Smoke Bomb' },
      update: {},
      create: {
        name: 'Smoke Bomb',
        description: "Creates a cloud of smoke, obscuring vision and providing cover for the rogue and allies.",
        emoji: '💨💣',
        type: 'Utility',
        manaCost: 35,
        level: 6,
        DPS: 0,
        defense: 20,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 7: Precision Strike
    await prisma.skill.upsert({
      where: { name: 'Precision Strike' },
      update: {},
      create: {
        name: 'Precision Strike',
        description: "Targets vital points, dealing massive damage to the enemy.",
        emoji: '🎯⚔️',
        type: 'Attack',
        manaCost: 40,
        level: 8,
        DPS: 100,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 8: Disarm Trap
    await prisma.skill.upsert({
      where: { name: 'Disarm Trap' },
      update: {},
      create: {
        name: 'Disarm Trap',
        description: "Safely disarms traps and devices without setting them off.",
        emoji: '🧩🚫',
        type: 'Utility',
        manaCost: 15,
        level: 7,
        DPS: 0,
        defense: 30,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 9: Vanish
    await prisma.skill.upsert({
      where: { name: 'Vanish' },
      update: {},
      create: {
        name: 'Vanish',
        description: "Completely disappears from sight, escaping combat or repositioning stealthily.",
        emoji: '🌫️',
        type: 'Utility',
        manaCost: 50,
        level: 10,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skill 10: Dual Strike
    await prisma.skill.upsert({
      where: { name: 'Dual Strike' },
      update: {},
      create: {
        name: 'Dual Strike',
        description: "Strikes with both weapons simultaneously, dealing high damage.",
        emoji: '⚔️⚔️',
        type: 'Attack',
        manaCost: 45,
        level: 9,
        DPS: 120,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Rouge'
          }
        }
      }
    });

    // Skills Mage
    // Skill 1: Fireball
    await prisma.skill.upsert({
      where: { name: 'Fireball' },
      update: {},
      create: {
        name: 'Fireball',
        description: "Launches a fiery projectile at the target, dealing fire damage.",
        emoji: '🔥🔮',
        type: 'Attack',
        manaCost: 25,
        level: 1,
        DPS: 60,
        defense: 0,
        health: 0,
        RNG: 3,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 2: Frost Nova
    await prisma.skill.upsert({
      where: { name: 'Frost Nova' },
      update: {},
      create: {
        name: 'Frost Nova',
        description: "Creates a freezing shockwave around the mage, slowing and damaging nearby enemies.",
        emoji: '❄️❄️',
        type: 'Area of Effect',
        manaCost: 30,
        level: 3,
        DPS: 20,
        defense: 0,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 3: Arcane Missiles
    await prisma.skill.upsert({
      where: { name: 'Arcane Missiles' },
      update: {},
      create: {
        name: 'Arcane Missiles',
        description: "Channels arcane energy to fire a barrage of homing missiles at the target.",
        emoji: '✨🚀',
        type: 'Attack',
        manaCost: 40,
        level: 5,
        DPS: 90,
        defense: 0,
        health: 0,
        RNG: 4,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 4: Teleportation
    await prisma.skill.upsert({
      where: { name: 'Teleportation' },
      update: {},
      create: {
        name: 'Teleportation',
        description: "Instantly teleports the mage to a targeted location within a short range.",
        emoji: '🌐✨',
        type: 'Utility',
        manaCost: 20,
        level: 2,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 5: Blizzard
    await prisma.skill.upsert({
      where: { name: 'Blizzard' },
      update: {},
      create: {
        name: 'Blizzard',
        description: "Summons a devastating blizzard that damages and slows all enemies in a targeted area.",
        emoji: '❄️❄️❄️',
        type: 'Area of Effect',
        manaCost: 50,
        level: 7,
        DPS: 40,
        defense: 0,
        health: 0,
        RNG: 5,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 6: Mana Shield
    await prisma.skill.upsert({
      where: { name: 'Mana Shield' },
      update: {},
      create: {
        name: 'Mana Shield',
        description: "Converts mana into a protective barrier, absorbing incoming damage for a short duration.",
        emoji: '💎🛡️',
        type: 'Defense',
        manaCost: 30,
        level: 4,
        DPS: 0,
        defense: 60,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 7: Lightning Bolt
    await prisma.skill.upsert({
      where: { name: 'Lightning Bolt' },
      update: {},
      create: {
        name: 'Lightning Bolt',
        description: "Unleashes a powerful lightning bolt that strikes the target with electrical damage.",
        emoji: '⚡⚡⚡',
        type: 'Attack',
        manaCost: 35,
        level: 6,
        DPS: 70,
        defense: 0,
        health: 0,
        RNG: 4,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 8: Polymorph
    await prisma.skill.upsert({
      where: { name: 'Polymorph' },
      update: {},
      create: {
        name: 'Polymorph',
        description: "Transforms the target into a harmless animal, rendering them unable to attack or cast spells.",
        emoji: '🐑🧙',
        type: 'Crowd Control',
        manaCost: 45,
        level: 8,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 9: Arcane Barrier
    await prisma.skill.upsert({
      where: { name: 'Arcane Barrier' },
      update: {},
      create: {
        name: 'Arcane Barrier',
        description: "Creates a protective arcane barrier that reduces incoming magic damage.",
        emoji: '🔮🛡️',
        type: 'Defense',
        manaCost: 25,
        level: 4,
        DPS: 0,
        defense: 40,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skill 10: Meteor Shower
    await prisma.skill.upsert({
      where: { name: 'Meteor Shower' },
      update: {},
      create: {
        name: 'Meteor Shower',
        description: "Calls down a rain of meteors upon a targeted area, causing massive area damage.",
        emoji: '☄️☄️☄️',
        type: 'Area of Effect',
        manaCost: 60,
        level: 10,
        DPS: 120,
        defense: 0,
        health: 0,
        RNG: 5,
        class: {
          connect: {
            name: 'Mage'
          }
        }
      }
    });

    // Skills Warrior
    // Skill 1: Sword Slash
    await prisma.skill.upsert({
      where: { name: 'Sword Slash' },
      update: {},
      create: {
        name: 'Sword Slash',
        description: "Performs a powerful sword slash, dealing melee damage to the target.",
        emoji: '⚔️',
        type: 'Attack',
        manaCost: 0,
        level: 1,
        DPS: 70,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 2: Shield Bash
    await prisma.skill.upsert({
      where: { name: 'Shield Bash' },
      update: {},
      create: {
        name: 'Shield Bash',
        description: "Bashes the target with a shield, stunning them briefly and dealing damage.",
        emoji: '🛡️⚔️',
        type: 'Attack',
        manaCost: 0,
        level: 3,
        DPS: 50,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 3: Battle Cry
    await prisma.skill.upsert({
      where: { name: 'Battle Cry' },
      update: {},
      create: {
        name: 'Battle Cry',
        description: "Lets out a mighty battle cry, boosting the warrior's attack damage temporarily.",
        emoji: '🗣️🔊',
        type: 'Buff',
        manaCost: 0,
        level: 2,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 4: Whirlwind
    await prisma.skill.upsert({
      where: { name: 'Whirlwind' },
      update: {},
      create: {
        name: 'Whirlwind',
        description: "Spins rapidly, hitting all nearby enemies with a whirlwind of attacks.",
        emoji: '🌪️⚔️',
        type: 'Area of Effect',
        manaCost: 0,
        level: 5,
        DPS: 60,
        defense: 0,
        health: 0,
        RNG: 2,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 5: Defensive Stance
    await prisma.skill.upsert({
      where: { name: 'Defensive Stance' },
      update: {},
      create: {
        name: 'Defensive Stance',
        description: "Assumes a defensive posture, reducing damage taken and increasing defense.",
        emoji: '🛡️🤺',
        type: 'Defense',
        manaCost: 0,
        level: 4,
        DPS: 0,
        defense: 70,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 6: Charge
    await prisma.skill.upsert({
      where: { name: 'Charge' },
      update: {},
      create: {
        name: 'Charge',
        description: "Charges at the target, stunning them and dealing damage upon impact.",
        emoji: '🏇⚔️',
        type: 'Attack',
        manaCost: 0,
        level: 7,
        DPS: 40,
        defense: 0,
        health: 0,
        RNG: 3,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 7: Taunt
    await prisma.skill.upsert({
      where: { name: 'Taunt' },
      update: {},
      create: {
        name: 'Taunt',
        description: "Taunts the target, forcing them to attack the warrior and reducing their damage to others.",
        emoji: '🤬🔥',
        type: 'Utility',
        manaCost: 0,
        level: 6,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 8: Rend
    await prisma.skill.upsert({
      where: { name: 'Rend' },
      update: {},
      create: {
        name: 'Rend',
        description: "Inflicts a bleeding effect on the target, causing damage over time.",
        emoji: '💉⚔️',
        type: 'Attack',
        manaCost: 0,
        level: 9,
        DPS: 30,
        defense: 0,
        health: 0,
        RNG: 1,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 9: Second Wind
    await prisma.skill.upsert({
      where: { name: 'Second Wind' },
      update: {},
      create: {
        name: 'Second Wind',
        description: "Regenerates health over time, allowing the warrior to endure longer in battle.",
        emoji: '💨❤️',
        type: 'Healing',
        manaCost: 0,
        level: 8,
        DPS: 0,
        defense: 0,
        health: 30,
        RNG: 0,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });

    // Skill 10: War Banner
    await prisma.skill.upsert({
      where: { name: 'War Banner' },
      update: {},
      create: {
        name: 'War Banner',
        description: "Places a war banner that boosts the attack damage of nearby allies.",
        emoji: '🚩🤺',
        type: 'Buff',
        manaCost: 0,
        level: 10,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 0,
        class: {
          connect: {
            name: 'Warrior'
          }
        }
      }
    });


    // Skills Druid
    // Skill 1: Nature's Grasp
    await prisma.skill.upsert({
      where: { name: "Nature's Grasp" },
      update: {},
      create: {
        name: "Nature's Grasp",
        description: "Summons the power of nature to entangle and root the target in place.",
        emoji: '🌿🌳',
        type: 'Crowd Control',
        manaCost: 25,
        level: 1,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 2,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 2: Moonfire
    await prisma.skill.upsert({
      where: { name: 'Moonfire' },
      update: {},
      create: {
        name: 'Moonfire',
        description: "Calls upon the moon's energy to burn the target with magical moonfire damage over time.",
        emoji: '🌙🔥',
        type: 'Attack',
        manaCost: 30,
        level: 2,
        DPS: 50,
        defense: 0,
        health: 0,
        RNG: 3,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 3: Shapeshift - Bear Form
    await prisma.skill.upsert({
      where: { name: 'Shapeshift - Bear Form' },
      update: {},
      create: {
        name: 'Shapeshift - Bear Form',
        description: "Transforms into a bear, gaining increased health and melee attack capabilities.",
        emoji: '🐻👊',
        type: 'Transformation',
        manaCost: 0,
        level: 3,
        DPS: 80,
        defense: 60,
        health: 200,
        RNG: 0,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 4: Regrowth
    await prisma.skill.upsert({
      where: { name: 'Regrowth' },
      update: {},
      create: {
        name: 'Regrowth',
        description: "Heals the target over time with the power of natural regeneration.",
        emoji: '🌱❤️',
        type: 'Healing',
        manaCost: 35,
        level: 4,
        DPS: 0,
        defense: 0,
        health: 40,
        RNG: 0,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 5: Hurricane
    await prisma.skill.upsert({
      where: { name: 'Hurricane' },
      update: {},
      create: {
        name: 'Hurricane',
        description: "Unleashes a powerful hurricane, damaging and knocking back all enemies in a targeted area.",
        emoji: '🌪️🌀',
        type: 'Area of Effect',
        manaCost: 40,
        level: 5,
        DPS: 70,
        defense: 0,
        health: 0,
        RNG: 4,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 6: Shapeshift - Cat Form
    await prisma.skill.upsert({
      where: { name: 'Shapeshift - Cat Form' },
      update: {},
      create: {
        name: 'Shapeshift - Cat Form',
        description: "Transforms into a cat, gaining increased agility and melee attack speed.",
        emoji: '🐱⚡',
        type: 'Transformation',
        manaCost: 0,
        level: 6,
        DPS: 90,
        defense: 20,
        health: 150,
        RNG: 0,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 7: Entangling Roots
    await prisma.skill.upsert({
      where: { name: 'Entangling Roots' },
      update: {},
      create: {
        name: 'Entangling Roots',
        description: "Causes roots to emerge from the ground, immobilizing the target.",
        emoji: '🌿🔗',
        type: 'Crowd Control',
        manaCost: 25,
        level: 7,
        DPS: 0,
        defense: 0,
        health: 0,
        RNG: 3,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 8: Rejuvenation
    await prisma.skill.upsert({
      where: { name: 'Rejuvenation' },
      update: {},
      create: {
        name: 'Rejuvenation',
        description: "Heals the target with the power of natural rejuvenation, restoring health over time.",
        emoji: '🍃❤️',
        type: 'Healing',
        manaCost: 30,
        level: 8,
        DPS: 0,
        defense: 0,
        health: 60,
        RNG: 0,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 9: Tranquility
    await prisma.skill.upsert({
      where: { name: 'Tranquility' },
      update: {},
      create: {
        name: 'Tranquility',
        description: "Calls upon the tranquility of nature to heal all nearby allies over time.",
        emoji: '🌳❤️🕊️',
        type: 'Healing',
        manaCost: 50,
        level: 9,
        DPS: 0,
        defense: 0,
        health: 100,
        RNG: 0,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Skill 10: Wild Shape - Elemental
    await prisma.skill.upsert({
      where: { name: 'Wild Shape - Elemental' },
      update: {},
      create: {
        name: 'Wild Shape - Elemental',
        description: "Transforms into a powerful elemental, gaining control over the elements for a limited time.",
        emoji: '🌊🔥🌪️🍃',
        type: 'Transformation',
        manaCost: 0,
        level: 10,
        DPS: 120,
        defense: 80,
        health: 250,
        RNG: 0,
        class: {
          connect: {
            name: 'Druid'
          }
        }
      }
    });

    // Items
    await upsertAllItems();

    // Maps
    await prisma.map.upsert({
      where: { name: 'Valdheim' },
      update: {},
      create: {
        name: 'Valdheim',
        description: "Valdheim is a large continent in the northern hemisphere of Azeroth. It is home to the Alliance city of Stormwind, the Horde city of Orgrimmar, and the neutral city of Dalaran. The continent is divided into several regions, each with its own unique geography and climate.",
      }
    });

    await prisma.map.upsert({
      where: {
        name: 'Eirwood'
      },
      update: {},
      create: {
        name: 'Eirwood',
        description: "Eirwood is a large forest in the southern part of Valdheim. It is home to many different creatures, including wolves, bears, and spiders. The forest is also home to the Night Elves, who live in the city of Darnassus.",
      }
    });

    await prisma.map.upsert({
      where: {
        name: 'Bjornfjord'
      },
      update: {},
      create: {
        name: 'Bjornfjord',
        description: "Bjornfjord is a large mountain range in the northern part of Valdheim. It is home to many different creatures, including wolves, bears, and spiders. The mountain range is also home to the Dwarves, who live in the city of Ironforge.",
      }
    });

    await prisma.map.upsert({
      where: {
        name: 'Jotunvale'
      },
      update: {},
      create: {
        name: 'Jotunvale',
        description: "Jotunvale is a desert in the southern part of Valdheim. It is home to many different creatures, including wolves, bears, and spiders. The desert is also home to the Tauren, who live in the city of Thunder Bluff.",
      }
    });

    await prisma.map.upsert({
      where: {
        name: 'Frostgard'
      },
      update: {},
      create: {
        name: 'Frostgard',
        description: "Frostgard is a camp in the extreme north of Valdheim surrounded by ice and snow. It is home to many different creatures, including wolves, bears, and spiders. The camp is also home to the Trolls, who live in the city of Sen'jin.",
      }
    });

    await prisma.map.upsert({
      where: {
        name: 'Njordrak'
      },
      update: {},
      create: {
        name: 'Njordrak',
        description: "Njordrak is a city that the sun never touches, in the valley of the moon, in the land of the midnight sun. It is home to many different creatures, including wolves, bears, and spiders. The city is also home to the Forsaken, who live in the city of Undercity.",
      }
    });

    // Monsters

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
