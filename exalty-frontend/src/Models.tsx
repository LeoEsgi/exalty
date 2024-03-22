import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ReactElement } from "react";

export class user {
  constructor(
    public id: number,
    public discord_tag: string,
    public email: string,
    public first_name: string,
    public last_name: string,
    public password: string,
    public pseudo: string,
    public last_connection: Date,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date | null,
    public active: boolean,
    public token_verification: string,
    public fidelity_points: number,
    public role_id: number,
    public order: order[],
    public role: role,
    public address: address[],
    public membership_id: number,
    public deleted?: boolean
  ) {}
}

export class order {
  constructor(
    public id: number,
    public discount: number,
    public price_ht: number,
    public price_ttc: number,
    public paid_price_ht: number,
    public paid_price_ttc: number,
    public payment_status: order_payment_status,
    public status: order_status,
    public created_at: Date,
    public updated_at: Date,
    public user_id: number,
    public billing_address: address,
    public shipping_address: address,
    public order_content: order_content[],
    public deleted?: boolean
  ) {}
}

export class order_content {
  constructor(
    public id: number,
    public quantity: number,
    public product_id: number,
    public product: product,
    public created_at: Date,
    public updated_at: Date,
    public flocking: order_content_flocking[],
    public size: order_content_size[],
    public deleted_at: Date | null,
    public order_id: number | null,
    public order: order | null
  ) {}
}
export class game {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public desc: string,
    public img: string,
    public new_img?: File
  ) {}
}

export class player {
  constructor(
    public id: number,
    public name: string,
    public role: string,
    public img: string,
    public type: player_type,
    public game_id: number,
    public new_img?: File,
    public deleted?: boolean
  ) {}
}

export class match {
  constructor(
    public id: number,
    public date: Date,
    public title: string,
    public instance: string,
    public opponent: string,
    public opponent_logo: string,
    public score_exa: number,
    public score_opponent: number,
    public status: match_status,
    public link: string,
    public timezone: string,
    public format: string = "BO1",
    public new_img?: File,
    public deleted?: boolean
  ) {}
}

export enum match_status {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export class address {
  constructor(
    public id: number,
    public address: string,
    public zipcode: string,
    public city: string,
    public title: string,
    public user_id: number,
    public created_at: Date,
    public updated_at: Date,
    public order_order_shipping_address_idToaddress: order | null,
    public order_order_billing_address_idToaddress: order | null
  ) {}
}

export class cart {
  constructor(
    public id: number,
    public created_at: Date,
    public updated_at: Date,
    public cart_content: cart_content[]
  ) {}
}

export class cart_content {
  constructor(
    public id: number,
    public quantity: number,
    public flocking: cart_content_flocking[],
    public size: cart_content_size[],
    public created_at: Date,
    public updated_at: Date,
    public product: product,
    public cart_id: number | null,
    public offer_id: number | null,
    public offer: offer | null,
    public cart: cart | null
  ) {}
}

export class cart_content_size {
  constructor(
    public id: number,
    public size: string,
    public cart_content_id: number,
    public cart_content: cart_content
  ) {}
}

export class cart_content_flocking {
  constructor(
    public id: number,
    public value: string,
    public cart_content_id: number,
    public cart_content: cart_content
  ) {}
}

export class order_content_size {
  constructor(
    public id: number,
    public size: string,
    public order_content_id: number,
    public order_content: cart_content
  ) {}
}

export class order_content_flocking {
  constructor(
    public id: number,
    public value: string,
    public order_content_id: number,
    public order_content: cart_content
  ) {}
}

export class message {
  constructor(
    public id: number,
    public pseudo: string,
    public discord_tag: string | null,
    public email: string,
    public subject: string,
    public text: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}

export class migrations {
  constructor(
    public id: number,
    public timestamp: number,
    public name: string
  ) {}
}

export class offer {
  constructor(
    public id: number,
    public published: number,
    public unit_price: number,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date | null,
    public cart_line: cart_content[],
    public order_line: order_line[],
    public product: product[]
  ) {}
}

export class order_line {
  constructor(
    public id: number,
    public amount: number,
    public flocking: string | null,
    public offer_copy: any,
    public size: order_line_size | null,
    public unit_price: number,
    public tax: number,
    public created_at: Date,
    public updated_at: Date,
    public order_id: number | null,
    public offer_id: number | null,
    public order: order | null,
    public offer: offer | null
  ) {}
}

export class credit_card {
  constructor(
    public id: number,
    public number: string,
    public expiration: string,
    public name: string,
    public cvc: string,
    public created_at: Date,
    public updated_at: Date,
    public user_id: number,
    public user: user
  ) {}
}

export class product {
  constructor(
    public id: number,
    public flockingable: boolean,
    public description: string,
    public name: string,
    public sizable: boolean,
    public img: string,
    public basePrice: number,
    public img2: string,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date | null,
    public offer_id: number | null,
    public offer: offer | null,
    public stock: stock[],
    public new_img?: File,
    public new_img2?: File,
    public deleted?: boolean
  ) {}
}

export class role {
  constructor(
    public id: number,
    public name: string,
    public permissions: string,
    public user_role: user_role[]
  ) {}
}

export class stock {
  constructor(
    public id: number,
    public amount: number,
    public size: stock_size | null,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date | null,
    public product_id: number | null,
    public product: product | null
  ) {}
}

export class user_role {
  constructor(
    public role_id: number,
    public role_name: string,
    public role: role
  ) {}
}

export class user_membership {
  constructor(
    public id: number,
    public membership_id: number,
    public start_date: Date,
    public end_date: Date | null,
    public user_id: number | null,
    public user: user | null
  ) {}
}

export class membership {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public occurence: price_occurence,
    public img: string,
    public created_at: Date,
    public updated_at: Date,
    public user_membership: user_membership[]
  ) {}
}

export class recruitement {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public created_at: Date,
    public updated_at: Date,
    public recruitement_sub_categoryId: number
  ) {}
}

export class recruitement_category {
  constructor(
    public id: number,
    public name: string,
    public recruitement_sub_category: recruitement_sub_category[] | null
  ) {}
}

export class recruitement_sub_category {
  constructor(
    public id: number,
    public name: string,
    public recruitement: recruitement[],
    public category: recruitement_category
  ) {}
}

export class sponsor {
  constructor(
    public id: number,
    public name: string,
    public img: string,
    public description: string,
    public link: string,
    public new_img?: File,
    public deleted?: boolean
  ) {}
}

export enum price_occurence {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum adjustment_type {
  POOL = "POOL",
}

export enum payment_status {
  NEW = "NEW",
  WAITING = "WAITING",
  PROCESSING = "PROCESSING",
  BLOCKED_FUNDS = "BLOCKED_FUNDS",
  PAID = "Payee",
  CANCELED = "Annulee",
  FAILED = "FAILED",
  REFUNDED = "Remboursee",
  REFUND_PENDING = "REFUND_PENDING",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
  REFUND_FAILED = "REFUND_FAILED",
}

export enum stock_size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "3XL",
  XXXXL = "4XL",
}

export enum cart_line_size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "3XL",
  XXXXL = "4XL",
}

export enum order_line_size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "3XL",
  XXXXL = "4XL",
}

export enum order_payment_status {
  NONE = "Aucun",
  AWAITING = "En Attente",
  PARTIALLY = "Partiellement",
  PAID = "Payee",
  TO_BE_REFUNDED = "a rembourser",
  POOLED = "Regroupee",
  PAYMENT_FAILED = "Echec de paiement",
  REFUNDED = "Remboursee",
}

export enum order_status {
  IN_PROGRESS = "En cours",
  CANCELLED = "Annulee",
  VALIDATED = "Validee",
  SHIPPED = "Livree",
}

export enum order_subscription {
  CONTRIBUTOR = "Contributeur",
  ADHERENT = "Adherent",
  PREMIUM_ADHERENT = "Adherent Premium",
}

export enum player_type {
  PLAYER = "PLAYER",
  COACH = "COACH",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  SUB = "SUB",
  COACH_SUB = "COACH_SUB",
  MANAGER_SUB = "MANAGER_SUB",
  STAFF_SUB = "STAFF_SUB",
}

export class event {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public img: string,
    public link: string,
    public start_date: Date,
    public end_date: Date,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date | null,
    public new_img?: File,
    public deleted?: boolean
  ) {}
}

export class DialogMsg {
  static fullScreen: boolean | undefined;
  static handleClose?: () => void;

  constructor(
    public title: string,
    public message: string,
    public fullScreen: boolean,
    public handleClose?: () => void
  ) {}

  static openDialog = (dialog: DialogMsg): ReactElement => {
    return (
      <Dialog
        fullScreen={dialog.fullScreen}
        open={true}
        onClose={dialog.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={dialog.handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}
