"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/util/useCart';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Ghost } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ROUTE } from '@/app/util/pageRoutes';
import { SUCCESS_MESSAGE } from '@/app/util/constant';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog';


function CartPage() {
  const cart = useCart();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null);
  const [dialogMode, setDialogMode] = useState<'single' | 'all' | null>(null);

  const onRemoveClick = (itemId: number) => {
    if (cart.items.length === 1) {
      setPendingRemoveId(itemId);
      setShowDialog(true);
      setDialogMode('single');
    } else {
      cart.remove(itemId);
    }
  };

  const confirmLastItemRemove = () => {
    if (dialogMode === 'single' && pendingRemoveId !== null) {
      cart.remove(pendingRemoveId);
    } else if (dialogMode === 'all') {
      cart.clear();
    }

    setShowDialog(false);
    setPendingRemoveId(null);
    setDialogMode(null);
  };

  if (cart.items.length === 0) {

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        </div>
        <Button size="lg" >
          <Link href={ROUTE.HOME}>Continue Shopping</Link>

        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 md:px-[8%] mx-auto animate-in fade-in duration-500 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.totalItem})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-6 py-4 border-b">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-lg overflow-hidden border">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                    <span className="text-sm text-gray-500 line-clamp-1 mt-1">
                      {item.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                    {item.discountPercentage > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        ${(item.price * (1 + item.discountPercentage / 100)).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">

                  {/* can add or remove the items from here also but the same item only------------------- */}
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => {
                        if (item.quantity === 1 && cart.totalItem === 1) {
                          setPendingRemoveId(item.id);
                          setDialogMode('single');
                          setShowDialog(true);
                        }  else {
                          cart.update(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="w-10 text-center text-sm font-medium">
                      {item.quantity}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      disabled={item.quantity >= item.stock}
                      onClick={() => cart.update(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* will remove single product from cart- the selected one only-------------- */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onRemoveClick(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* will remove all the product from cart--------------- */}
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (cart.totalItem > 0) {
                  setDialogMode('all');
                  setPendingRemoveId(null);
                  setShowDialog(true);
                }
              }}
            >
              Remove All
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Details</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">

              <span className="text-gray-600">Total ({cart.totalItem} items)</span>
              <span className="font-medium">${cart.subtotal.toFixed(2)}
              </span>
            </div>

            <Separator />
            <div className="flex justify-between items-center bg-white p-3 rounded-[8px] border border-gray-100 shadow-sm">
              <span className=" font-bold">Total</span>
              <span className="text-xl font-bold ">${cart.subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* will checkout the product from cart--------------- */}
          <Button className="w-full mt-8" onClick={() => toast.info(SUCCESS_MESSAGE.COMMING_SOON)} size="lg">
            Checkout Products

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

{/* alert dialog box when remove last item from cart-------------------------- */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove the last item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your cart will be empty.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLastItemRemove}>
              Yes, remove it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CartPage;