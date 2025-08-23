import { PrismaClient } from "@prisma/client";
import {
  ProductType,
  ProductCreateData,
  ProductUpdateData,
  ProductWithOrderItems,
  ProductWithReviews,
  ProductBasicInfo,
  ProductFilter,
  ProductListResponse,
} from "../types/product-types";

const prisma = new PrismaClient();

export class ProductService {
  // 商品を作成
  async createProduct(data: ProductCreateData): Promise<ProductType> {
    return await prisma.product.create({
      data,
    });
  }

  // 商品を取得（基本情報のみ）
  async getProductBasicInfo(id: number): Promise<ProductBasicInfo | null> {
    return await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });
  }

  // 商品を取得（注文項目を含む）
  async getProductWithOrderItems(
    id: number
  ): Promise<ProductWithOrderItems | null> {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
  }

  // 商品を取得（レビューを含む）
  async getProductWithReviews(id: number): Promise<ProductWithReviews | null> {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: true,
      },
    });
  }

  // 商品を更新
  async updateProduct(
    id: number,
    data: ProductUpdateData
  ): Promise<ProductType> {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  // 商品を検索（フィルター付き）
  async searchProducts(
    filter: ProductFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<ProductListResponse> {
    const where = {
      ...(filter.name && {
        name: {
          contains: filter.name,
        },
      }),
      ...(filter.minPrice && {
        price: {
          gte: filter.minPrice,
        },
      }),
      ...(filter.maxPrice && {
        price: {
          lte: filter.maxPrice,
        },
      }),
      ...(filter.minStock && {
        stock: {
          gte: filter.minStock,
        },
      }),
      ...(filter.maxStock && {
        stock: {
          lte: filter.maxStock,
        },
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // 商品を削除
  async deleteProduct(id: number): Promise<ProductType> {
    return await prisma.product.delete({
      where: { id },
    });
  }
}
