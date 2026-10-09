export type BusinessAccount = {
  id: string
  name: string
  accountNumber: string
}

export const businessAccounts: BusinessAccount[] = [
  { id: "na", name: "Acme Inc. - North America", accountNumber: "1234567" },
  { id: "eu", name: "Acme Inc. - Europe", accountNumber: "2345678" },
  { id: "apac", name: "Acme Inc. - APAC", accountNumber: "3456789" },
]

export const currentUser = {
  name: "Adam Cassidy",
  email: "adam.cassidy@acmeinc.com",
  initials: "AC",
}
