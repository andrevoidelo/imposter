package com.impostor.app;

import android.os.Bundle;
import android.view.View;
import android.view.Window;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Enable edge-to-edge mode
        Window window = getWindow();
        WindowCompat.setDecorFitsSystemWindows(window, false);

        // Configure system bars appearance
        View decorView = window.getDecorView();
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, decorView);
        if (controller != null) {
            // Light status bar icons (for dark backgrounds)
            controller.setAppearanceLightStatusBars(false);
            // Light navigation bar icons (for dark backgrounds)
            controller.setAppearanceLightNavigationBars(false);
        }
    }
}