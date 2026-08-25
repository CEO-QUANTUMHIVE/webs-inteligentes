#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../..");
const baseAssetsDir = path.join(repoRoot, "clientes", "quantum-hive", "assets", "by-rubro");

/**
 * URLs curadas de Unsplash con licencia libre para uso comercial.
 * Cada rubro contiene imágenes HD para hero, portadas, galerías y servicios.
 */
const RUBRO_LIBRARY = {
  retail: [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85", alt: "Moda urbana y tienda de indumentaria" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85", alt: "Colección de temporada" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85", alt: "Prendas de vestir exclusivas" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", alt: "Estilo y diseño urbano" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85", alt: "Accesorios y moda contemporánea" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85", alt: "Catálogo de ropa femenina y masculina" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85", alt: "Detalles y textura de prendas" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85", alt: "Lookbook urbano de temporada" }
  ],
  gastronomia: [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85", alt: "Restaurante y salón gourmet" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85", alt: "Platos gourmet de autor" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85", alt: "Plato principal artesanal" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=85", alt: "Ensaladas y opciones frescas" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=85", alt: "Pizza artesanal en horno de barro" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85", alt: "Coctelería y barra de bebidas" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85", alt: "Café de especialidad y pastelería" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85", alt: "Ambiente cálido e iluminación nocturna" }
  ],
  barberia: [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85", alt: "Sillón de barbería clásico" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1400&q=85", alt: "Barbería profesional y estética masculina" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=85", alt: "Corte de pelo y fade preciso" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=85", alt: "Perfilado y cuidado de barba" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=85", alt: "Herramientas de navaja y tijeras" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1000&q=85", alt: "Productos de barbería y grooming" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=85", alt: "Atención personalizada al cliente" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1517832606589-7150060931d8?auto=format&fit=crop&w=1000&q=85", alt: "Estética y estilo clásico de barbería" }
  ],
  wellness: [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85", alt: "Spa y centro de bienestar" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1400&q=85", alt: "Tratamientos estéticos y relax" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85", alt: "Manicura y diseño de uñas editorial" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=85", alt: "Masajes corporales y aromaterapia" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85", alt: "Cuidado facial y skincare" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85", alt: "Productos naturales y relajación" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1512290900673-7002fa874404?auto=format&fit=crop&w=1000&q=85", alt: "Espacio zen de meditación" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=85", alt: "Cosmética natural y belleza" }
  ],
  inmobiliaria: [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85", alt: "Residencia moderna y diseño de lujo" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", alt: "Propiedad exclusiva con arquitectura de vanguardia" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85", alt: "Living espacioso con luz natural" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=85", alt: "Cocina integrada de diseño contemporáneo" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1000&q=85", alt: "Suite principal con balcón panorámico" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85", alt: "Piscina y área exterior de descanso" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85", alt: "Fachada exterior con vegetación" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85", alt: "Detalles finos y terminaciones premium" }
  ],
  "servicios-pro": [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85", alt: "Oficina corporativa de diseño abierto" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85", alt: "Equipo profesional colaborando en proyecto" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=85", alt: "Reunión de estrategia corporativa" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85", alt: "Consultoría y asesoramiento profesional" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85", alt: "Presentación y trabajo en equipo" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85", alt: "Análisis de datos y métricas corporativas" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1542744801-30d00f050a45?auto=format&fit=crop&w=1000&q=85", alt: "Workspace profesional con tecnología" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85", alt: "Edificio de arquitectura financiera" }
  ],
  tech: [
    { name: "hero.jpg", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85", alt: "Tecnología de vanguardia y circuitos" },
    { name: "portada.jpg", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85", alt: "Ciberseguridad y datos cifrados" },
    { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85", alt: "Hardware y pantallas de monitoreo" },
    { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=85", alt: "Desarrollo de software y código" },
    { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85", alt: "Redes globales y computación en la nube" },
    { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85", alt: "Servidores y centro de procesamiento de datos" },
    { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=85", alt: "Inteligencia artificial y analítica avanzada" },
    { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85", alt: "Equipo de ingeniería de software" }
  ]
};

async function downloadFile(url, targetPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} al descargar ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(targetPath, buffer);
}

async function main() {
  console.log("🚀 Iniciando descarga de la biblioteca de assets libres por rubro...");
  let totalDownloaded = 0;

  for (const [rubro, items] of Object.entries(RUBRO_LIBRARY)) {
    const rubroDir = path.join(baseAssetsDir, rubro);
    await mkdir(rubroDir, { recursive: true });
    console.log(`\n📁 Procesando rubro: ${rubro.toUpperCase()} (${items.length} imágenes)`);

    const manifest = [];
    for (const item of items) {
      const filePath = path.join(rubroDir, item.name);
      if (!existsSync(filePath)) {
        process.stdout.write(`  ⏳ Descargando ${item.name}... `);
        try {
          await downloadFile(item.url, filePath);
          console.log("✅ ok");
          totalDownloaded++;
        } catch (err) {
          console.log(`❌ error: ${err.message}`);
        }
      } else {
        console.log(`  ✔ ${item.name} ya existe`);
      }
      manifest.push({ name: item.name, alt: item.alt });
    }

    await writeFile(path.join(rubroDir, "ASSETS.json"), JSON.stringify(manifest, null, 2));
  }

  console.log(`\n✨ Descarga completada: ${totalDownloaded} imágenes descargadas a clientes/quantum-hive/assets/by-rubro/`);
}

main().catch((err) => {
  console.error("❌ Error en el script de descarga:", err);
  process.exit(1);
});
