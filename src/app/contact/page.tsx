"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Send,
  MessageCircle,
  Coffee,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer l'URL mailto avec les données du formulaire
    const subject = encodeURIComponent(`[Portfolio] ${formData.subject}`);
    const body = encodeURIComponent(
      `Bonjour Bastien,\n\n${formData.message}\n\nCordialement,\n${formData.name}\n\nEmail de réponse : ${formData.email}`
    );

    const mailtoUrl = `mailto:hello@exemple.com?subject=${subject}&body=${body}`;

    // Ouvrir le client email
    window.location.href = mailtoUrl;
  };

  // Option pour envoyer vers un endpoint API (à configurer)
  const handleApiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message envoyé avec succès !");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(
        'Erreur lors de l\'envoi du message. Veuillez utiliser le bouton "Ouvrir votre client email".'
      );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                Prenons Contact
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/60">
                Discutons de votre projet ensemble
              </p>
            </div>

            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Que vous ayez un projet en tête, une question ou simplement envie
              d'échanger sur le développement web, je serais ravi de vous
              entendre.
            </p>

            <div className="flex items-center justify-center space-x-8 text-foreground/60">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Échange</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="h-5 w-5" />
                <span>Collaboration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Réactivité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Mes coordonnées
                </h2>
                <p className="text-foreground/70 mb-8">
                  N'hésitez pas à me contacter par le moyen qui vous convient le
                  mieux. Je m'efforce de répondre dans les 24 heures.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <p className="text-foreground/60 text-sm mb-2">
                          Le moyen le plus rapide pour me joindre
                        </p>
                        <a
                          href="mailto:hello@exemple.com"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          bastienguitard8@gmail.com
                        </a>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Réponse sous 24h
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Localisation
                        </h3>
                        <p className="text-foreground/60 text-sm mb-2">
                          Disponible pour projets locaux et à distance
                        </p>
                        <p className="text-foreground/80">France</p>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Télétravail possible
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Retrouvez-moi aussi sur
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/bastienggg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bastien-guitard-30585329b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            {/* <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-moi un message</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et je vous répondrai
                    rapidement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="L'objet de votre message"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Décrivez votre projet, vos besoins ou votre question..."
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col space-y-3">
                      <Button type="submit" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Ouvrir votre client email
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleApiSubmit}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer via API (optionnel)
                      </Button>

                      <p className="text-xs text-foreground/60 text-center">
                        Le bouton principal ouvrira votre client email avec le
                        message pré-rempli. L'option API nécessite une
                        configuration serveur.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card> */}

            {/* Note de configuration */}
            {/* <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  🔧 Configuration pour développeurs
                </h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <p>
                    • Modifiez l'email dans le footer :{" "}
                    <code>src/components/Footer.tsx</code>
                  </p>
                  <p>
                    • Créez un endpoint API :{" "}
                    <code>src/app/api/contact/route.ts</code>
                  </p>
                  <p>
                    • Configurez un service email : Resend, SendGrid,
                    Nodemailer...
                  </p>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
