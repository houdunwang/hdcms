export interface Payer {
  openid: string
}

export interface Amount {
  total: number
  payer_total: number
  currency: string
  payer_currency: string
}

export interface PayResult {
  mchid: string
  appid: string
  out_trade_no: string
  transaction_id: string
  trade_type: string
  trade_state: string
  trade_state_desc: string
  bank_type: string
  attach: string
  success_time: string
  payer: Payer
  amount: Amount
}
