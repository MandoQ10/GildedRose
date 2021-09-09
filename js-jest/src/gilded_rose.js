//Challenge: 


class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if(!this.isValidQuality(this.items[i])){
        console.log("Item: " + this.items[i].name + " has an invalid quality")
      }else if(this.didSellInPass(this.items[i]) && this.isValidQuality(this.items[i])){
        this.updateSellInPassedQuality(this.items[i]);
      }else {

        if((this.isQualityCapped(this.items[i]))){
          this.items[i].sellIn = this.items[i].sellIn - 1;
        }else{

            if(this.isDefaultItem(this.items[i])){
              this.items[i].quality -= 1;
              this.items[i].sellIn -= 1;
            }

            if(this.isAgedBrie(this.items[i])){
              this.items[i].quality += 1;
              this.items[i].sellIn -= 1;
            }
  
            if(this.isBackstagePasses(this.items[i])){
              this.updateBackstageQuality(this.items[i]);
            }

            if(this.isConjured(this.items[i])){
              this.items[i].quality -= 2;
              this.items[i].sellIn -= 1;
            }
        }
      }
    }
    return this.items;
  }

  updateSellInPassedQuality(item){
    if(this.isBackstagePasses(item)){
      item.quality = 0;
      item.sellIn -= 1;
    }else if(this.isAgedBrie(item)){
      item.quality += 2;
      item.sellIn -= 1;
    }else if(this.isSulfuras(item)){
      item.sellIn -= 1;
    }else if(this.isConjured(item)){
      item.quality -= 4;
      item.sellIn -= 1;
    }else if(item.quality == 0 || item.quality == 50){
      item.sellIn -= 1;
    }else{
      item.quality -= 2;
      item.sellIn -= 1;
    }
  }

  updateBackstageQuality(item){
    if(item.sellIn <= 10 && item.sellIn > 5){
      item.quality += 2;
      item.sellIn -= 1;
    }else if(item.sellIn <= 5 && item.sellIn > 0){
      item.quality += 3;
      item.sellIn -= 1;
    }else{
      item.quality += 1;
      item.sellIn -= 1;
    }
  }

  isAgedBrie(item){
    if(item.name === "Aged Brie"){
      return true;
    }else{
      return false;
    }
  }

  isSulfuras(item){
    if(item.name === "Sulfuras, Hand of Ragnaros"){
      return true;
    }else{
      return false;
    }
  }

  isBackstagePasses(item){
    if(item.name === "Backstage passes to a TAFKAL80ETC concert"){
      return true;
    }else{
      return false;
    }
  }

  isConjured(item){
    if(item.name === "Conjured"){
      return true;
    }else{
      return false;
    }
  }

  isDefaultItem(item){
    return !(this.isAgedBrie(item) || this.isBackstagePasses(item) || this.isSulfuras(item) || this.isConjured(item))
    
  }

  isValidQuality(item){
    if(this.isSulfuras(item) && item.quality == 80){
      return true;
    }else if(item.quality >= 0 && item.quality <= 50){
      return true;
    }else{
      return false;
    }
  }

  isQualityCapped(item){
    if(item.quality == 50 && (this.isAgedBrie(item) || this.isBackstagePasses(item))){
      return true;
    }else{
      return false;
    }
  }

  didSellInPass(item){
    if(item.sellIn <= 0){
      return true;
    }else{
      return false;
    }
  }
}

module.exports = {
  Item,
  Shop
}