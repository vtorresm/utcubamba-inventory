import React, { useState, useEffect } from 'react'
import { ShoppingCart, Package, Truck, CheckCircle, Plus, Edit, X } from 'lucide-react'
import Swal from 'sweetalert2'

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  createdAt: string
}

interface OrderItem {
  medicationId: number
  name: string
  quantity: number
  price: number
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [newOrderItems, setNewOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    // Simular la carga de pedidos desde una API
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: 'user1',
        items: [
          { medicationId: 1, name: 'Ibuprofen', quantity: 2, price: 9.99 },
          { medicationId: 3, name: 'Loratadine', quantity: 1, price: 12.99 }
        ],
        status: 'processing',
        totalAmount: 32.97,
        createdAt: '2024-03-15T10:30:00Z'
      },
      {
        id: '2',
        userId: 'user1',
        items: [
          { medicationId: 2, name: 'Amoxicillin', quantity: 1, price: 15.99 }
        ],
        status: 'shipped',
        totalAmount: 15.99,
        createdAt: '2024-03-14T14:45:00Z'
      }
    ]
    setOrders(mockOrders)

    // Mostrar notificaciones iniciales
    Swal.fire({
      title: 'Notificaciones',
      html: `
        <p>Su pedido #1 ha sido procesado</p>
        <p>Su pedido #2 ha sido enviado</p>
      `,
      icon: 'info',
      confirmButtonText: 'Entendido'
    })
  }, [])

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsCreatingOrder(false)
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <ShoppingCart className="text-yellow-500" />
      case 'processing':
        return <Package className="text-blue-500" />
      case 'shipped':
        return <Truck className="text-purple-500" />
      case 'delivered':
        return <CheckCircle className="text-green-500" />
      case 'cancelled':
        return <X className="text-red-500" />
    }
  }

  const handleCreateOrder = () => {
    setIsCreatingOrder(true)
    setSelectedOrder(null)
    setNewOrderItems([])
  }

  const handleAddItem = () => {
    setNewOrderItems([...newOrderItems, { medicationId: 0, name: '', quantity: 1, price: 0 }])
  }

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = [...newOrderItems]
    if (field === 'price') {
      // Remover el "S/." y cualquier carácter no numérico antes de convertir a número
      value = parseFloat(value.toString().replace(/[^0-9.]/g, ''))
    }
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setNewOrderItems(updatedItems)
  }

  const handleRemoveItem = (index: number) => {
    setNewOrderItems(newOrderItems.filter((_, i) => i !== index))
  }

  const handleSubmitOrder = () => {
    const newOrder: Order = {
      id: (orders.length + 1).toString(),
      userId: 'user1',
      items: newOrderItems,
      status: 'pending',
      totalAmount: newOrderItems.reduce((total, item) => total + item.price * item.quantity, 0),
      createdAt: new Date().toISOString()
    }
    setOrders([...orders, newOrder])
    setIsCreatingOrder(false)
    showNotification('success', `Su nuevo pedido #${newOrder.id} ha sido creado`)
  }

  const handleCancelOrder = (orderId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar pedido',
      cancelButtonText: 'No, mantener pedido'
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        ))
        showNotification('info', `El pedido #${orderId} ha sido cancelado`)
      }
    })
  }

  const showNotification = (icon: 'success' | 'error' | 'warning' | 'info', message: string) => {
    Swal.fire({
      icon,
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Gestión de Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mis Pedidos</h3>
            <button
              onClick={handleCreateOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <Plus size={18} className="mr-2" /> Nuevo Pedido
            </button>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {orders.map(order => (
              <div
                key={order.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOrder?.id === order.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pedido #{order.id}</span>
                  {getStatusIcon(order.status)}
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="font-semibold mt-2">S/.{order.totalAmount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {isCreatingOrder ? 'Crear Nuevo Pedido' : 'Detalles del Pedido'}
          </h3>
          {isCreatingOrder ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-4">Artículos del Pedido</h4>
              {newOrderItems.map((item, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del medicamento</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Paracetamol"
                  />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                  />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                          S/.
                        </span>
                  <input
                          type="text"
                          value={`${item.price}`}
                          onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                  />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center"
                  >
                    <X size={16} className="mr-1" /> Eliminar
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddItem}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <Plus size={18} className="mr-2" /> Agregar artículo
              </button>
              <div className="mt-6">
                <button
                  onClick={handleSubmitOrder}
                  className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center w-full md:w-auto"
                >
                  <ShoppingCart size={18} className="mr-2" /> Crear Pedido
                </button>
              </div>
            </div>
          ) : selectedOrder ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Pedido #{selectedOrder.id}</h4>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium capitalize" style={{
                    backgroundColor:
                      selectedOrder.status === 'pending' ? 'rgb(253, 230, 138)' :
                      selectedOrder.status === 'processing' ? 'rgb(191, 219, 254)' :
                      selectedOrder.status === 'shipped' ? 'rgb(216, 180, 254)' :
                      selectedOrder.status === 'delivered' ? 'rgb(167, 243, 208)' :
                      'rgb(254, 202, 202)',
                    color:
                      selectedOrder.status === 'pending' ? 'rgb(146, 64, 14)' :
                      selectedOrder.status === 'processing' ? 'rgb(30, 64, 175)' :
                      selectedOrder.status === 'shipped' ? 'rgb(107, 33, 168)' :
                      selectedOrder.status === 'delivered' ? 'rgb(6, 95, 70)' :
                      'rgb(153, 27, 27)'
                  }}>
                    {selectedOrder.status}
                  </span>
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                    <button
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300 text-sm"
                    >
                      Cancelar Pedido
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Fecha del pedido: {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <div className="mb-4">
                <h5 className="font-semibold mb-2">Artículos:</h5>
                <ul className="space-y-2">
                  {selectedOrder.items.map(item => (
                    <li key={item.medicationId} className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Selecciona un pedido para ver sus detalles o crea uno nuevo.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderManagement
