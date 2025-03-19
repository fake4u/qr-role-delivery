
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withRoleProtection, useAuth } from "@/contexts/AuthContext";
import QRScanner from "@/components/QRScanner";
import { QrCode, CheckCheck, Package, LogOut, ArrowRight } from "lucide-react";

const CustomerDashboard = () => {
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
                Customer
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
          <h1 className="text-2xl font-bold mb-1">Customer Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your packages
          </p>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="packages" className="animate-fade-in">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="packages">My Packages</TabsTrigger>
            <TabsTrigger value="scan">Scan QR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages" className="mt-0">
            <Card className="neo p-6 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Active Packages</h3>
                  <Button variant="ghost" size="sm" className="text-sm gap-1 group">
                    <span>View All</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-start justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex space-x-4">
                        <div className="bg-amber-100 p-3 rounded-lg mt-1">
                          <Package className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Electronics Package</p>
                          <p className="text-sm text-muted-foreground mb-1">
                            PKG-{1000 + item} • {new Date().toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                              In Transit
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Est. delivery: {new Date(Date.now() + 86400000 * 2).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Track
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <h3 className="text-lg font-medium">Delivered</h3>
                </div>
                
                <div className="space-y-4">
                  {[3, 4, 5].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-start justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex space-x-4">
                        <div className="bg-green-100 p-3 rounded-lg mt-1">
                          <CheckCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Clothing Package</p>
                          <p className="text-sm text-muted-foreground mb-1">
                            PKG-{1000 + item} • {new Date(Date.now() - 86400000 * item).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                              Delivered
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="scan" className="mt-0">
            <div className="max-w-md mx-auto">
              <QRScanner />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default withRoleProtection(CustomerDashboard, ["customer"]);
