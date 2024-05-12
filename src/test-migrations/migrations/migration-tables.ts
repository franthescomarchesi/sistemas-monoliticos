import { Sequelize } from 'sequelize-typescript';
import { MigrationFn } from 'umzug';
import { products } from '../tables/products';
import { client } from '../tables/client';
import { transactions } from '../tables/transactions';
import { invoice } from '../tables/invoice';
import { invoiceItems } from '../tables/invoice-items';
import { clientCheckout } from '../tables/client-checkout';
import { productCheckout } from '../tables/product-checkout';
import { order } from '../tables/order';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('products', products)
  await sequelize.getQueryInterface().createTable('client_adm', client)
  await sequelize.getQueryInterface().createTable('transactions', transactions) 
  await sequelize.getQueryInterface().createTable('invoice', invoice)
  await sequelize.getQueryInterface().createTable('invoice_items', invoiceItems)
  await sequelize.getQueryInterface().createTable('client_checkout', clientCheckout)
  await sequelize.getQueryInterface().createTable('product_checkout', productCheckout)
  await sequelize.getQueryInterface().createTable('order', order)
}

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('products')
  await sequelize.getQueryInterface().dropTable('client_adm')
  await sequelize.getQueryInterface().dropTable('transactions')
  await sequelize.getQueryInterface().dropTable('invoice')
  await sequelize.getQueryInterface().dropTable('invoice_items')
  await sequelize.getQueryInterface().dropTable('client_checkout')
  await sequelize.getQueryInterface().dropTable('product_checkout')
  await sequelize.getQueryInterface().dropTable('order')
} 