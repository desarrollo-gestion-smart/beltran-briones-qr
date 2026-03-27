"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";

const FILAS = 6;
const DELAY = 1400;
const ALTURA = 17;

const MENSAJES = [
  "Cada segundo de espera es un cliente que se va.",
  "El 53% abandona si un sitio tarda más de 3 segundos.",
  "Un sitio lento habla mal de su marca, aunque no lo quiera.",
  "Sus competidores ya tienen sitios rápidos y modernos.",
  "Un ladrillo a la vez... igual que su web actual.",
  "La primera impresión digital es tan importante como la física.",
];

interface Fila {
  id: number;
  offset: boolean;
}

const filas: Fila[] = Array.from({ length: FILAS }, (_, i) => ({
  id: i,
  offset: i % 2 === 0,
}));

export default function Home() {
  const [fase, setFase] = useState<1 | 2>(1);
  const [filaActual, setFilaActual] = useState(-1);
  const [obreroBottom, setObreroBottom] = useState(10);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const msgIdxRef = useRef(0);

  useEffect(() => {
    let currentFila = 0;

    const buildFila = () => {
      if (currentFila >= FILAS) {
        setTimeout(() => setFase(2), 700);
        return;
      }

      setFilaActual(currentFila);
      setObreroBottom((currentFila + 1) * ALTURA + 10);

      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex(msgIdxRef.current % MENSAJES.length);
        msgIdxRef.current++;
        setMsgVisible(true);
      }, 350);

      currentFila++;
      setTimeout(buildFila, DELAY);
    };

    const timer = setTimeout(buildFila, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fase !== 2) return;

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          window.location.href = "https://beltranbriones.com";
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fase]);

  return (
    <>
      <div className={styles.browserBar}>
        <div className={styles.bdots}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.urlBar}>🔒 beltranbriones.com</div>
      </div>
      <div className={styles.progressTop} />

      {/* FASE 1 */}
      {fase === 1 && (
        <div className={styles.escena}>
          <div className={styles.tituloTop}>Cargando su sitio web</div>

          <div className={styles.construccion}>
            {/* Grúa */}
            <div className={styles.grua}>
              <div className={styles.gruaTorre}>
                <div className={styles.gruaCable} />
                <div className={styles.gruaCarga} />
              </div>
            </div>

            {/* Edificio */}
            <div className={styles.edificio}>
              {filas.map((fila) => (
                <div
                  key={fila.id}
                  className={`${styles.fila} ${fila.id <= filaActual ? styles.visible : ""}`}
                >
                  {fila.offset && <div className={`${styles.lb} ${styles.half}`} />}
                  {Array.from({ length: 7 }, (_, l) => (
                    <div
                      key={l}
                      className={`${styles.lb}${
                        fila.id > 0 && fila.id < FILAS - 1 && l % 2 === 0
                          ? " " + styles.ventana
                          : ""
                      }`}
                    />
                  ))}
                  {fila.offset && <div className={`${styles.lb} ${styles.half}`} />}
                </div>
              ))}
            </div>

            {/* Obrero */}
            <div
              className={styles.obreroWrap}
              style={{ bottom: `${obreroBottom}px` }}
            >
              <div className={styles.obrero}>
                <div className={styles.casco} />
                <div className={styles.cabeza} />
                <div className={styles.cuerpo} />
                <div className={styles.brazoD} />
                <div className={styles.brazoI} />
                <div className={styles.lbMano} />
                <div className={styles.piernaD} />
                <div className={styles.piernaI} />
              </div>
            </div>

            <div className={styles.suelo} />
          </div>

          <div className={styles.mensajePrincipal}>
            Beltrán, ¿cuánto tarda en promedio
            <br />
            el desarrollo de un inmueble?
            <br />
            <em>Tu web actualmente te está haciendo competencia</em>
            <br />
            <em>y quien ganaría: ¿la carga de la web o el edificio?</em>
          </div>

          <div className={styles.progreso}>
            {filaActual >= 0
              ? `Piso ${filaActual + 1} de ${FILAS}...`
              : "Iniciando..."}
          </div>

          <div
            className={styles.msgRotante}
            style={{ opacity: msgVisible ? 1 : 0 }}
          >
            {MENSAJES[msgIndex]}
          </div>
        </div>
      )}

      {/* FASE 2 */}
      {fase === 2 && (
        <div className={styles.faseFinal}>
          <div className={styles.edificioEmoji}>🏢</div>
          <div className={styles.lineaRoja} />
          <h2>Tu marca merece un sitio tan sólido como lo que construís.</h2>
          <p>
            Tu web debería <strong>cargar en segundos,</strong> generar
            confianza y convertir visitantes en compradores reales.
          </p>
          <div className={styles.aliado}>
            <p>
              Dame la oportunidad —<br />
              seré tu <strong>aliado tecnológico de confianza.</strong>
            </p>
          </div>
          <div className={styles.lineaRoja} />
          <div className={styles.firma}>Alejandro Ezequiel Delgado</div>
          <div className={styles.contactoFinal}>
            Diseñador Web · Gestion Globals Software
            <br />
            admin@gestion-globals-software.com
            <br />
            +54 11 3641 7717
          </div>
          <div className={styles.redir}>
            {countdown > 0
              ? `Ingresando al sitio actual en ${countdown}...`
              : "Redirigiendo..."}
          </div>
        </div>
      )}
    </>
  );
}
