import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withRoleProtection, useAuth } from "@/contexts/AuthContext";
import QRGenerator from "@/components/QRGenerator";
import { PackageSearch, QrCode, LogOut, PackagePlus } from "lucide-react";

interface PackageStats {
  total: number;
  delivered: number;
  inTransit: number;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<PackageStats>({
    total: 43,
    delivered: 31,
    inTransit: 12,
  });

  return (
    <div className="min-h-screen bg-secondary/50">
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
                Admin
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Generate and manage package QR codes
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0 btn-primary gap-2"
          >
            <PackagePlus className="h-4 w-4" />
            <span>New Package</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 neo flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <PackageSearch className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Packages</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </Card>
          
          <Card className="p-6 neo flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <PackageSearch className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Delivered</p>
              <p className="text-2xl font-bold">{stats.delivered}</p>
            </div>
          </Card>
          
          <Card className="p-6 neo flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <PackageSearch className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">In Transit</p>
              <p className="text-2xl font-bold">{stats.inTransit}</p>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="generate" className="animate-fade-in">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="generate">Generate QR</TabsTrigger>
            <TabsTrigger value="history">Package History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="mt-0">
            <div className="max-w-md mx-auto">
              <QRGenerator />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <Card className="neo p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Packages</h3>
                
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded">
                          <QrCode className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">PKG-{1000 + item}</p>
                          <p className="text-sm text-muted-foreground">
                            Electronics • {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline">
                    Load More
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default withRoleProtection(AdminDashboard, ["admin"]);
