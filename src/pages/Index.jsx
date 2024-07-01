import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const transactionSchema = z.object({
  date: z.string().nonempty("Date is required"),
  amount: z.number().min(0, "Amount must be positive"),
  type: z.enum(["income", "expense"]),
  category: z.string().nonempty("Category is required"),
});

const placeholderTransactions = [
  { id: 1, date: "2023-10-01", amount: 200, type: "income", category: "Nike" },
  { id: 2, date: "2023-10-02", amount: 150, type: "expense", category: "Adidas" },
];

function Index() {
  const [transactions, setTransactions] = useState(placeholderTransactions);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = (data) => {
    if (editingTransaction) {
      setTransactions(transactions.map((t) => (t.id === editingTransaction.id ? { ...data, id: t.id } : t)));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...data, id: transactions.length + 1 }]);
    }
    reset();
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    reset(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Sneaker Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Transaction</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="date">Date</label>
                  <Input id="date" type="date" {...register("date")} />
                  {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <Input id="amount" type="number" {...register("amount", { valueAsNumber: true })} />
                  {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
                </div>
                <div>
                  <label htmlFor="type">Type</label>
                  <Select {...register("type")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <Input id="category" {...register("category")} />
                  {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </div>
                <Button type="submit">{editingTransaction ? "Update" : "Add"}</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEdit(transaction)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;