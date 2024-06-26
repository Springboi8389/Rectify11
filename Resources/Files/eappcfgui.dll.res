        ��  ��                  �  ,   U I F I L E   ��-    0	          <?xml version="1.0" encoding="us-ascii"?>
<duixml>
<element resid="IdentityUIPage"/>
<element resid="InteractiveUIPage"/>
<element resid="GenericIdentityUIPage" id="atom(GenericIdentityUIPage)" layout="flowlayout()" accessible="true" accrole="pane" accname="GenericUiPage" sheet="ModernStyle" width="265rp"> 
<element id="atom(ModernProgressRing_e)" layout="flowlayout()" class="ProgressRingPadding" layoutpos="none" accessible="true">
<ModernProgressRing id="atom(ProgressRing)" layoutpos="left" height="20rp" width="20rp" foreground="buttontext"/>
<RichText content="resstr(4001)" contentalign="bottomleft | wrapleft" layoutpos="client" padding="rect(10rp,0rp,0rp,0rp)" accrole="statictext" accessible="true"/> 
</element>
<element id="atom(passwordCredsNode)" layoutpos="none" layout="flowlayout()">
<element id="atom(winlogon_e)" layoutpos="none" layout="flowlayout()" padding="rect(0rp,8rp,0rp,18rp)"> 
<touchcheckbox id="atom(winlogon)" shortcut="119" accessible="true" content="resstr(4000)" ContentAlign="middleleft | wrapleft"/>
</element>
<element id="atom(UsernameNode)" layoutpos="top" layout="flowlayout()" class="InputPaddingWithoutWinlogon"> 
<touchedit2 id="atom(username)" shortcut="117" accessible="true" PromptText="resstr(30)" PromptWithCaret="true" accName="resstr(4002)" ContentAlign="middleleft" behaviors="Windows.UI.Popups::TouchEditContextMenu()"/>
</element>
<element id="atom(PasswordNode)" layoutpos="top" layout="flowlayout()" class="InputPaddingWithoutText"> 
<touchedit2 id="atom(password)" passwordcharacter="9679" shortcut="112" accessible="true" PromptText="resstr(31)" PromptWithCaret="true" accName="resstr(4003)" ContentAlign="middleleft" behaviors="Windows.UI.Popups::TouchEditContextMenu()"/>
</element>
<element id="atom(otherCreds_e)" layoutpos="none" layout="flowlayout()" padding="rect(0rp,24rp,0rp,0rp)">
<TouchHyperlink id="atom(otherCreds)" class="LinkText" handleenter="true" accdefaction="click" accessible="true" accrole="link"/>
</element>
</element>
<element id="atom(certificate_e)" layoutpos="none" layout="flowlayout()" padding="rect(0rp,16rp,0rp,20rp)">
<touchbutton id="atom(certificate)" content="resstr(4004)" handleenter="true" accessible="true" class="CredButton"/>
</element>
<element id="atom(sim_e)" layoutpos="none" layout="flowlayout()" padding="rect(0rp,0rp,0rp,4rp)">
<touchbutton id="atom(sim)" content="resstr(4005)" handleenter="true" accessible="true" class="CredButton"/>
</element>
</element>
<stylesheets>
<style resid="ModernStyle" base="ressheet(ImmersiveStyles, library(Windows.UI.Immersive.dll), Dark)">
<RichText constrainlayout="narrow"/>
<touchhyperlink constrainlayout="narrow"/>
<if class="CredButton">
<if keyfocused="true"> 
<touchbutton contentalign="middleleft | focusrect"/> 
</if>
<if keyfocused="false"> 
<touchbutton contentalign="middleleft"/> 
</if>
</if>
<if class="InputPaddingWithoutWinlogon">
<element padding="rect(0rp, 20rp, 0rp, 20rp)"/>
</if>
<if class="InputPaddingWithWinlogon">
<element padding="rect(0rp, 0rp, 0rp, 20rp)"/>
</if>
<if class="InputPaddingManaged">
<element padding="rect(0rp, 0rp, 0rp, 20rp)"/>
</if>
<if class="InputPaddingWithoutText">
<element padding="rect(0rp, 0rp, 0rp, 4rp)"/>
</if>
<if class="ProgressRingPadding">
<element padding="rect(0rp,31rp,0rp,0rp)"/>
</if>
<if class="ProgressRingPaddingManaged">
<element padding="rect(0rp,0rp,0rp,0rp)"/>
</if>
<if class="LinkText">
<if keyfocused="true"> 
<TouchHyperlink contentalign="wrapleft | focusrect"/> 
</if>
<if keyfocused="false"> 
<TouchHyperlink contentalign="wrapleft"/> 
</if>
</if>
</style>
<style resid="ModernStyleLight" base="ressheet(ImmersiveStyles, library(Windows.UI.Immersive.dll), Light)">
<RichText constrainlayout="narrow"/>
<touchhyperlink constrainlayout="narrow"/>
<if class="CredButton">
<if keyfocused="true"> 
<touchbutton contentalign="middleleft | focusrect"/> 
</if>
<if keyfocused="false"> 
<touchbutton contentalign="middleleft"/> 
</if>
</if>
<if class="InputPaddingWithoutWinlogon">
<element padding="rect(0rp, 20rp, 0rp, 20rp)"/>
</if>
<if class="InputPaddingWithWinlogon">
<element padding="rect(0rp, 0rp, 0rp, 20rp)"/>
</if>
<if class="InputPaddingManaged">
<element padding="rect(0rp, 0rp, 0rp, 20rp)"/>
</if>
<if class="InputPaddingWithoutText">
<element padding="rect(0rp, 0rp, 0rp, 4rp)"/>
</if>
<if class="ProgressRingPadding">
<element padding="rect(0rp,31rp,0rp,0rp)"/>
</if>
<if class="ProgressRingPaddingManaged">
<element padding="rect(0rp,0rp,0rp,0rp)"/>
</if>
<if class="LinkText">
<if keyfocused="true"> 
<TouchHyperlink contentalign="wrapleft | focusrect"/> 
</if>
<if keyfocused="false"> 
<TouchHyperlink contentalign="wrapleft"/> 
</if>
</if>
</style>
</stylesheets>
</duixml>
   