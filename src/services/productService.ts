import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'http://localhost:5000/api/products';

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 1499.90,
    description: 'Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    ],
    category: 'electronics',
    oldPrice: 1699.90,
  },
  {
    id: 2,
    name: 'Camiseta Estilosa',
    price: 59.90,
    description: 'Camiseta 100% algodão, disponível em várias cores.',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    ],
    category: 'clothing',
    oldPrice: 69.90,
  },
  {
    id: 3,
    name: 'Fone de Ouvido Bluetooth',
    price: 299.90,
    description: 'Fone de ouvido sem fio com excelente qualidade de som.',
    imageUrl: 'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    ],
    category: 'electronics',
    oldPrice: 399.90,
  },
  {
    id: 4,
    name: 'Relógio de Pulso',
    price: 249.90,
    description: 'Relógio masculino com design moderno e resistente à água.',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    ],
    category: 'accessories',
    oldPrice: 269.90,
  },
  {
    id: 5,
    name: 'Jaqueta Casual',
    price: 399.90,
    description: 'Jaqueta estilosa para dias frios.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    ],
    category: 'clothing',
    oldPrice: 499.90,
  },
];

export const getProductsFromApi = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos na API:', error);
    return [...fallbackProducts];
  }
};

export const getProductByIdFromApi = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto pelo ID na API:', error);
    return null;
  }
};

export const createProductInApi = async (data: Product): Promise<Product> => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto na API:', error);
    throw new Error('Erro ao criar produto');
  }
};

export const updateProductInApi = async (id: number, data: Partial<Product>): Promise<Product> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto na API:', error);
    throw new Error('Erro ao atualizar produto');
  }
};

export const deleteProductFromApi = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir produto na API:', error);
    throw new Error('Erro ao excluir produto');
  }
};

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...fallbackProducts]), 500));
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...fallbackProducts].find((p) => p.id === id) || null), 500)
  );
};
