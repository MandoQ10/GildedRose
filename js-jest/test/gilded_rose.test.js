const {Shop, Item} = require("../src/gilded_rose");

describe("Items are of the given categories", function() {
  it("should return true because all items are of the 3 categories", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 5), new Item("Sulfuras, Hand of Ragnaros", 5, 5), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);

    const items = gildedRose.updateQuality();
    
    var result = true;
    for(let i = 0; i < items.length; i++){
      if(gildedRose.isDefaultItem(items[i])){
        result = false;
      }
    }

    expect(result).toBe(true);
  });
});

describe("Uncategorized items", function() {
  it("should return true as item is not be a listed/category item", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(gildedRose.isDefaultItem(items[0])).toBe(true);
  });

  it("item sellIn should only decrease by 1 and quality is non-negative", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("item sellIn and quality should only decrease by 1", function() {
    const gildedRose = new Shop([new Item("foo", 10, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(49);
    expect(items[0].sellIn).toBe(9);
  });

  it("item quality is invalid and should return false", function() {
    const gildedRose = new Shop([new Item("foo", 1, 60)]);
    const items = gildedRose.updateQuality();

    expect(gildedRose.isValidQuality(items[0])).toBe(false);
  });
});

describe("Age Brie tests", function() {
  it("item is Age Brie", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 5)]);
    const items = gildedRose.updateQuality();

    expect(gildedRose.isAgedBrie(items[0])).toBe(true);
  });

  it("quality should cap at 50 while still reducing sellIn by 1", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  it("should update both sellIn and Quality date (-1 and +1 respectively)", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 5)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(4);
  });

  it("should update both sellIn and Quality date (-1 and +2 respectively) when sellIn date passes", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(7);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe("Backstage Passes Tests", function() {
  it("Item is Backstage passes to a TAFKAL80ETC concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);
    const items = gildedRose.updateQuality();

    expect(gildedRose.isBackstagePasses(items[0])).toBe(true);
  });

  it("quality should cap at 50 while still reducing sellIn by 1", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  it("quality should reduce to 0 after sellIn passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("should update both sellIn and Quality date (-1 and +1 respectively when sell In > 10)", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 12)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(13);
    expect(items[0].sellIn).toBe(10);
  });

  it("should update both sellIn and Quality date (-1 and +2 respectively when sell In <= 10 and > 5)", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 12)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(14);
    expect(items[0].sellIn).toBe(9);
  });

  it("should update both sellIn and Quality date (-1 and +3 respectively when sell In >= 5 and > 0)", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 25)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(28);
    expect(items[0].sellIn).toBe(0);
  });
});

describe("Sulfuras, Hand of Ragnaros Tests", function() {
  it("Item is Sulfuras, Hand of Ragnaros", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);

    const items = gildedRose.updateQuality();

    expect(gildedRose.isSulfuras(items[0])).toBe(true);
  });

  it("should return false since sulfuras quality should always be 80", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 70)]);

    const items = gildedRose.updateQuality();

    expect(gildedRose.isValidQuality(items[0])).toBe(false);
  });

  it("quality and sell in should stay the same", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });
});

describe("Conjured Tests", function() {
  it("Item is Conjured", function() {
    const gildedRose = new Shop([new Item("Conjured", 5, 50)]);

    const items = gildedRose.updateQuality();

    expect(gildedRose.isConjured(items[0])).toBe(true);
  });

  it("quality should decrease twice as fast as normal items (-2)", function() {
    const gildedRose = new Shop([new Item("Conjured", 5, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(48);
    expect(items[0].sellIn).toBe(4);
  });

  it("quality should decrease by -4 when sellIn date passes", function() {
    const gildedRose = new Shop([new Item("Conjured", 0, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(46);
    expect(items[0].sellIn).toBe(-1);
  });
});