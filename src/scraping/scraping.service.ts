import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScrapingService {
  async getTopSellers() {
    try {
      const { data } = await axios.get('https://store.steampowered.com/?l=english', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      const $ = cheerio.load(data);
      const topSellers = [];
      
      // Selecciona los 10 primeros juegos en la sección de Top Sellers
      $('#top_sellers .tab_item').slice(0, 10).each((i, element) => {
        const name = $(element).find('.tab_item_name').text().trim();
        const price = $(element).find('.discount_final_price').text().trim();
        const tags = $(element)
          .find('.tab_item_top_tags')
          .text()
          .split(',')
          .map(tag => tag.trim());
        const image = $(element).find('.tab_item_cap_img').attr('src');

        topSellers.push({
          name,
          price,
          tags,
          image,
        });
      });

      return topSellers;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error al obtener los juegos más vendidos');
    }
  }
}