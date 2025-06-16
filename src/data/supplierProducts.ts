
export interface SupplierProduct {
  id: number;
  name: string;
  supplier: string;
  location: string;
  costPrice: number;
  retailPrice: number;
  image: string;
  category: string;
  description: string;
  specs: string[];
  sales: number;
  rating: number;
  tags: string[];
}

export const supplierProducts: SupplierProduct[] = [
  {
    id: 101,
    name: '冰青青梅果酒·高端版',
    supplier: '四川梅鹤酒业有限公司',
    location: '四川',
    costPrice: 200,
    retailPrice: 280,
    image: '/lovable-uploads/581586bf-9a04-4325-b99e-30cfa6f061ea.png',
    category: 'wine',
    description: '冰青青梅果酒高端版，选用优质青梅果，传统工艺酿造，口感清香回甘',
    specs: ['单瓶装 750ml', '礼盒装 6瓶×750ml'],
    sales: 1200,
    rating: 4.9,
    tags: ['梅果酒', '高端精品', '四川特产', '传统工艺']
  },
  {
    id: 102,
    name: '世外梅林香柚青梅酒',
    supplier: '马边山水酒业有限公司',
    location: '四川',
    costPrice: 80,
    retailPrice: 118,
    image: '/lovable-uploads/50b76766-a5f0-4b7f-8aae-093afca8061b.png',
    category: 'wine',
    description: '香柚与青梅完美融合，果香浓郁，酸甜适中，适合女性饮用',
    specs: ['单瓶装 750ml', '礼盒装 6瓶×750ml'],
    sales: 850,
    rating: 4.8,
    tags: ['香柚梅酒', '果香浓郁', '四川工艺', '女性喜爱']
  },
  {
    id: 103,
    name: '舒醺巧克力威士忌梅酒',
    supplier: '宜宾五粮液仙林生态酒业',
    location: '四川',
    costPrice: 20,
    retailPrice: 45,
    image: '/lovable-uploads/1f83017a-893e-4ccb-9008-6709b57df8e6.png',
    category: 'wine',
    description: '巧克力与威士忌的完美结合，创新口味，层次丰富',
    specs: ['单瓶装 750ml', '礼盒装 6瓶×750ml'],
    sales: 2100,
    rating: 4.7,
    tags: ['巧克力威士忌', '创新口味', '五粮液工艺', '层次丰富']
  },
  {
    id: 104,
    name: '桑果之约乖乖梅果酒',
    supplier: '泸州顺成和庄园酒业',
    location: '四川',
    costPrice: 30,
    retailPrice: 39.86,
    image: '/lovable-uploads/f17f95a8-00d1-469e-9ad9-b47397319d18.png',
    category: 'wine',
    description: '桑果与梅子的甜蜜邂逅，口感温润甘甜，适合聚会分享',
    specs: ['单瓶装 750ml', '礼盒装 6瓶×750ml'],
    sales: 1680,
    rating: 4.6,
    tags: ['桑果梅酒', '甜蜜口感', '庄园酿造', '聚会佳品']
  },
  {
    id: 105,
    name: '梅见原味梅酒',
    supplier: '重庆瓶子星球酒业集团',
    location: '重庆',
    costPrice: 120,
    retailPrice: 150,
    image: '/lovable-uploads/68a411df-9696-447b-a897-b6ee68c3a8bf.png',
    category: 'wine',
    description: '传统工艺酿造的原味梅酒，保持梅子天然风味，口感纯正',
    specs: ['单瓶装 750ml', '礼盒装 6瓶×750ml'],
    sales: 980,
    rating: 4.8,
    tags: ['原味梅酒', '传统工艺', '重庆特产', '天然风味']
  }
];

export const getSupplierProductsByUser = (username: string) => {
  if (username === 'ytkj-wine') {
    return supplierProducts;
  }
  return [];
};
