import {
  PrismaClient,
  address,
  cart,
  order,
  credit_card,
  cart_content,
  product,
  cart_line_size,
} from "@prisma/client";
const prisma = new PrismaClient();

export default class ShopService {
  private static instance: ShopService;

  constructor() {}

  public static getInstance(): ShopService {
    if (!ShopService.instance) {
      ShopService.instance = new ShopService();
    }
    return ShopService.instance;
  }

  public async createAddress(addressData: address): Promise<address> {
    return await prisma.address.create({
      data: addressData,
    });
  }

  public async getAddressById(id: number): Promise<address | null> {
    return await prisma.address.findFirst({
      where: {
        id,
      },
    });
  }

  public async getAddressByUserId(user_id: number): Promise<address[] | null> {
    return await prisma.address.findMany({
      where: {
        user_id,
      },
    });
  }

  public async createCart(
    user_id: number,
    product: product,
    quantity: number,
    size: cart_line_size,
    flocking?: string
  ): Promise<cart_content> {
    let cart = await prisma.cart.findFirst({
      where: {
        user_id,
      },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user_id,
        },
      });
      return await prisma.cart_content.create({
        data: {
          card_id: cart.id,
          product_id: product.id,
          quantity: quantity,
          size: size,
          flocking: flocking,
        },
      });
    }
    const cartContent = await prisma.cart_content.findFirst({
      where: {
        card_id: cart.id,
        product_id: product.id,
      },
    });
    if (cartContent) {
      return await prisma.cart_content.update({
        where: {
          id: cartContent.id,
        },
        data: {
          quantity: cartContent.quantity + quantity,
        },
      });
    }

    return await prisma.cart_content.create({
      data: {
        card_id: cart.id,
        product_id: product.id,
        quantity: quantity,
        size: size,
        flocking: flocking,
      },
    });
  }

  public async delete_cart_content(id: number) {
    const c = await prisma.cart_content.delete({
      where: {
        id,
      },
    });

    console.log(c);

    return await prisma.cart.findFirst({
      where: {
        user_id: c.card_id,
      },
      include: {
        cart_content: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async getCartById(id: number): Promise<cart | null> {
    return await prisma.cart.findFirst({
      where: {
        id,
      },
    });
  }

  public async getCartByUserId(user_id: number): Promise<cart | null> {
    return await prisma.cart.findFirst({
      where: {
        user_id,
      },
      include: {
        cart_content: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async createOrder(orderData: order): Promise<order> {
    return await prisma.order.create({
      data: orderData,
    });
  }

  public async getOrderById(id: number): Promise<order | null> {
    return await prisma.order.findFirst({
      where: {
        id,
      },
    });
  }
  public async getOrderByUserId(user_id: number): Promise<order[] | null> {
    return await prisma.order.findMany({
      where: {
        user_id,
      },
      include: {
        order_content: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async createCreditCard(
    creditCardData: credit_card
  ): Promise<credit_card> {
    return await prisma.credit_card.create({
      data: creditCardData,
    });
  }

  public async getCreditCardById(id: number): Promise<credit_card | null> {
    return await prisma.credit_card.findFirst({
      where: {
        id,
      },
    });
  }

  public async getCreditCardByUserId(
    user_id: number
  ): Promise<credit_card[] | null> {
    return await prisma.credit_card.findMany({
      where: {
        user_id,
      },
    });
  }
}
