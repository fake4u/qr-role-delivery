
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withRoleProtection, useAuth } from "@/contexts/AuthContext";
import QRScanner from "@/components/QRScanner";
import { QrCode, UserCircle, PackageSearch, LogOut, CheckCheck, Truck } from "lucide-react";

const DeliveryAgentDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-secondary/50">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <QrCode className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">QR Delivery</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.name}
              </span>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                Delivery Agent
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Delivery Dashboard</h1>
          <p className="text-muted-foreground">
            Scan and verify package QR codes
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 neo flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Today's Deliveries</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </Card>
          
          <Card className="p-6 neo flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Completed</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </Card>
          
          <Card className="p-6 neo flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <PackageSearch className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Pending</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </Card>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="scan" className="animate-fade-in">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="scan">Scan QR</TabsTrigger>
            <TabsTrigger value="deliveries">My Deliveries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="mt-0">
            <div className="max-w-md mx-auto">
              <QRScanner />
            </div>
          </TabsContent>
          
          <TabsContent value="deliveries" className="mt-0">
            <Card className="neo p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Today's Deliveries</h3>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-amber-100 p-2 rounded">
                          <Truck className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">PKG-{1000 + item}</p>
                          <p className="text-sm text-muted-foreground">
                            123 Main St • New York
                          </p>
                        </div>
                      </div>
                      <div className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                        Pending
                      </div>
                    </div>
                  ))}
                  
                  {[4, 5, 6, 7, 8].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded">
                          <CheckCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">PKG-{1000 + item}</p>
                          <p className="text-sm text-muted-foreground">
                            456 Oak Ave • Brooklyn
                          </p>
                        </div>
                      </div>
                      <div className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Delivered
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default withRoleProtection(DeliveryAgentDashboard, ["delivery"]);
