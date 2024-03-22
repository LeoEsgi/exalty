import {
  PrismaClient,
  address,
  cart,
  order,
  credit_card,
  order_content,
  product,
  cart_content,
  order_status,
  order_payment_status,
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
    size?: string[],
    flocking?: string[]
  ): Promise<cart | null> {
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
    }

    await this.create_cart_content(
      cart.id,
      product.id,
      quantity,
      size,
      flocking
    );

    return await prisma.cart.findFirst({
      where: {
        user_id,
      },
      include: {
        cart_content: {
          include: {
            product: true,
            size: true,
            flocking: true,
          },
        },
      },
    });
  }

  public async create_cart_content(
    card_id: number,
    product_id: number,
    quantity: number,
    size?: string[],
    flocking?: string[]
  ): Promise<cart_content> {
    const c = await prisma.cart_content.upsert({
      where: {
        card_id_product_id: {
          card_id,
          product_id,
        },
      },
      create: {
        card_id,
        product_id,
        quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });

    if (c) {
      if (size && size.length > 0) {
        await Promise.all(
          size.map((s) =>
            prisma.cart_content_size.create({
              data: {
                cart_content_id: c.id,
                size: s,
              },
            })
          )
        );
      }

      if (flocking && flocking.length > 0) {
        await Promise.all(
          flocking.map((f) =>
            prisma.cart_content_flocking.create({
              data: {
                cart_content_id: c.id,
                value: f,
              },
            })
          )
        );
      }
    }

    return c;
  }

  public async delete_cart_content(id: number) {
    await prisma.cart_content_size.deleteMany({
      where: {
        cart_content_id: id,
      },
    });

    await prisma.cart_content_flocking.deleteMany({
      where: {
        cart_content_id: id,
      },
    });

    const c = await prisma.cart_content.delete({
      where: {
        id,
      },
    });

    return await prisma.cart.findFirst({
      where: {
        id: c.card_id,
      },
      include: {
        cart_content: {
          include: {
            product: true,
            size: true,
            flocking: true,
          },
        },
      },
    });
  }

  public async update_cart_content(id: number, quantity: number) {
    const cartContent = await prisma.cart_content.findFirst({
      where: {
        id,
      },
    });

    if (!cartContent) {
      return null;
    }

    const c = await prisma.cart_content.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    const diff = quantity - cartContent.quantity;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        await prisma.cart_content_size.create({
          data: {
            cart_content_id: c.id,
            size: "M",
          },
        });

        await prisma.cart_content_flocking.create({
          data: {
            cart_content_id: c.id,
            value: "",
          },
        });
      }
    }

    return await prisma.cart.findFirst({
      where: {
        id: c.card_id,
      },
      include: {
        cart_content: {
          include: {
            product: true,
            size: true,
            flocking: true,
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
            size: true,
            flocking: true,
          },
        },
      },
    });
  }

  public async createOrder(
    price_ht: number,
    price_ttc: number,
    paid_price_ht: number,
    paid_price_ttc: number,
    user_id: number,
    billing_address_id: number,
    shipping_address_id: number,
    discount: number
  ): Promise<order> {
    return await prisma.order.create({
      data: {
        price_ht,
        price_ttc,
        paid_price_ht,
        paid_price_ttc,
        user_id,
        billing_address_id,
        shipping_address_id,
        discount,
        payment_status: "PAID",
        status: "VALIDATED",
      },
    });
  }

  public async updateOrder(
    id: number,
    status: order_status,
    payment_status: order_payment_status
  ): Promise<order> {
    return await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
        payment_status,
      },
    });
  }

  public async createOrderContent(
    quantity: number,
    product_id: number,
    order_id: number,
    size?: string[],
    flocking?: string[]
  ): Promise<order_content> {
    const c = await prisma.order_content.create({
      data: {
        quantity,
        product_id,
        order_id,
      },
    });

    if (c) {
      if (size && size.length > 0) {
        await Promise.all(
          size.map((s) =>
            prisma.order_content_size.create({
              data: {
                order_content_id: c.id,
                size: s,
              },
            })
          )
        );
      }

      if (flocking && flocking.length > 0) {
        await Promise.all(
          flocking.map((f) =>
            prisma.order_content_flocking.create({
              data: {
                order_content_id: c.id,
                value: f,
              },
            })
          )
        );
      }
    }

    return c;
  }

  public async getAllOrders(): Promise<order[] | null> {
    return await prisma.order.findMany({
      include: {
        order_content: {
          include: {
            product: true,
            size: true,
            flocking: true,
          },
        },
        billing_address: true,
        shipping_address: true,
      },
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
        billing_address: true,
        shipping_address: true,
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
