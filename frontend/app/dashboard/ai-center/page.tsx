"use client";

import {
  Bot,
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  Wind,
  Thermometer,
  Droplets,
  Send,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function AICenterPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          AI Decision Engine
        </h1>

        <p className="mt-2 text-slate-400">
          Industrial Safety Recommendations powered by Gemini + RAG
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-6 xl:col-span-2">

          {/* AI CHAT */}

          <Card className="border-slate-800 bg-slate-900 shadow-xl">

            <CardHeader>

              <CardTitle className="flex items-center gap-3 text-white">

                <Bot className="text-cyan-400" />

                AI Safety Assistant

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                <div className="rounded-xl bg-slate-950 p-5">

                  <div className="mb-4 flex items-center gap-3">

                    <Sparkles className="text-cyan-400" />

                    <span className="font-semibold text-cyan-400">
                      Gemini Response
                    </span>

                  </div>

                  <p className="leading-7 text-slate-300">

                    Air quality is currently within acceptable industrial
                    limits.

                    No immediate action is required.

                    Continue monitoring gas concentration and temperature.

                  </p>

                </div>

                <div className="rounded-xl bg-blue-950/40 border border-blue-800 p-5">

                  <h3 className="mb-3 font-semibold text-blue-300">

                    Recommendation

                  </h3>

                  <p className="text-slate-300">

                    Increase ventilation if gas concentration exceeds
                    180 ppm.

                    Schedule preventive inspection during the next
                    maintenance cycle.

                  </p>

                </div>

                <textarea

                  rows={4}

                  placeholder="Ask AI about industrial safety..."

                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"

                />

                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">

                  <Send className="mr-2 h-4 w-4" />

                  Ask AI

                </Button>

              </div>

            </CardContent>

          </Card>

          {/* RAG */}

          <Card className="border-slate-800 bg-slate-900 shadow-xl">

            <CardHeader>

              <CardTitle className="flex items-center gap-3 text-white">

                <BrainCircuit className="text-violet-400" />

                Retrieved Knowledge

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                <div className="rounded-xl bg-slate-950 p-4">

                  <h3 className="mb-2 font-semibold text-violet-400">

                    WHO Guideline

                  </h3>

                  <p className="text-slate-300">

                    AQI below 50 indicates healthy air quality.

                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <h3 className="mb-2 font-semibold text-violet-400">

                    Industrial Standard

                  </h3>

                  <p className="text-slate-300">

                    Gas above 200 ppm requires immediate inspection.

                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <h3 className="mb-2 font-semibold text-violet-400">

                    Worker Safety

                  </h3>

                  <p className="text-slate-300">

                    Wear respiratory protection in hazardous zones.

                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <Card className="border-slate-800 bg-slate-900 shadow-xl">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-white">
      Safety Score
    </CardTitle>
  </CardHeader>

  <CardContent>

    <Progress value={82} className="h-3" />

    <div className="mt-6 text-center">

      <h2 className="text-5xl font-bold text-white">
        82%
      </h2>

      <p className="mt-2 text-green-400 font-medium">
        Safe Environment
      </p>

    </div>

  </CardContent>
</Card>

<Card className="border-slate-800 bg-slate-900 shadow-xl">

  <CardHeader>

    <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

      <Thermometer className="text-red-500"/>

      Current Readings

    </CardTitle>

  </CardHeader>

  <CardContent className="space-y-5">

    <div className="flex justify-between">

      <div className="flex items-center gap-2 text-slate-200">

        <Thermometer className="h-5 w-5 text-red-500"/>

        Temperature

      </div>

      <span className="font-semibold text-white">
        28.5°C
      </span>

    </div>

    <div className="flex justify-between">

      <div className="flex items-center gap-2 text-slate-200">

        <Droplets className="h-5 w-5 text-cyan-400"/>

        Humidity

      </div>

      <span className="font-semibold text-white">

        63%

      </span>

    </div>

    <div className="flex justify-between">

      <div className="flex items-center gap-2 text-slate-200">

        <Wind className="h-5 w-5 text-green-400"/>

        Gas Level

      </div>

      <span className="font-semibold text-white">

        145 ppm

      </span>

    </div>

  </CardContent>

</Card>
{/* Risk Assessment */}

<Card className="border-slate-800 bg-slate-900 shadow-xl">

  <CardHeader>

    <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

      <ShieldCheck className="text-green-400" />

      Risk Assessment

    </CardTitle>

  </CardHeader>

  <CardContent>

    <div className="rounded-xl border border-green-700 bg-green-900/20 p-5">

      <div className="flex items-center gap-3">

        <ShieldCheck className="h-7 w-7 text-green-400" />

        <div>

          <h3 className="font-semibold text-green-400">

            LOW RISK

          </h3>

          <p className="text-sm text-slate-300">

            Overall environment is stable.

          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between">

          <span className="text-slate-300">
            Air Quality
          </span>

          <span className="font-medium text-green-400">
            Excellent
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-300">
            Worker Safety
          </span>

          <span className="font-medium text-green-400">
            Safe
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-300">
            Ventilation
          </span>

          <span className="font-medium text-green-400">
            Optimal
          </span>

        </div>

      </div>

    </div>

  </CardContent>

</Card>

{/* Suggested Actions */}

<Card className="border-slate-800 bg-slate-900 shadow-xl">

  <CardHeader>

    <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

      <AlertTriangle className="text-yellow-400" />

      Suggested Actions

    </CardTitle>

  </CardHeader>

  <CardContent>

    <div className="space-y-4">

      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">

        <h4 className="font-semibold text-white">

          Continue Monitoring

        </h4>

        <p className="mt-2 text-sm text-slate-400">

          Sensor values remain within acceptable industrial thresholds.

        </p>

      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">

        <h4 className="font-semibold text-white">

          Schedule Inspection

        </h4>

        <p className="mt-2 text-sm text-slate-400">

          Perform preventive inspection during the next maintenance cycle.

        </p>

      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">

        <h4 className="font-semibold text-white">

          AI Recommendation

        </h4>

        <p className="mt-2 text-sm text-slate-400">

          Maintain current ventilation settings and continue collecting
          sensor data for predictive analysis.

        </p>

      </div>

    </div>

  </CardContent>

</Card>
        </div>

      </div>

    </div>

  );
}